package rs.raf.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;
import rs.raf.demo.model.ErrorMessage;
import rs.raf.demo.model.Operation;
import rs.raf.demo.model.User;
import rs.raf.demo.model.Vacuum;
import rs.raf.demo.repositories.VacuumRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VacuumService {
    private final VacuumRepository vacuumRepository;
    private final ErrorMessageService errorMessageService;
    private final TaskExecutor taskExecutor;
    private final TaskScheduler taskScheduler;

    @Autowired
    public VacuumService(VacuumRepository vacuumRepository, ErrorMessageService errorMessageService, TaskExecutor taskExecutor, TaskScheduler taskScheduler) {
        this.vacuumRepository = vacuumRepository;
        this.errorMessageService = errorMessageService;
        this.taskExecutor = taskExecutor;
        this.taskScheduler = taskScheduler;
    }

    public Vacuum addVacuum(Vacuum vacuum) {
        return vacuumRepository.save(vacuum);
    }

    public Optional<Vacuum> getVacuumById(Long id) {

        return vacuumRepository.findByVacuumIdAndActiveIsTrue(id);
    }

    public boolean deleteVacuumById(Long id) {
        Optional<Vacuum> vacuum = getVacuumById(id);
        if (vacuum.isPresent() && vacuum.get().getStatus().equals(Vacuum.VacuumStatus.OFF)) {
            vacuum.get().setActive(false);
            vacuumRepository.save(vacuum.get());
            return true;
        }

        return false;
    }

    public List<Vacuum> searchVacuums(
            User user,
            Optional<String> name,
            Optional<List<String>> status,
            Optional<Date> dateFrom,
            Optional<Date> dateTo
    ) {
        return vacuumRepository.findVacuumsByAddedByUser(user)
                .stream()
                .filter(Vacuum::isActive)
                .filter(vacuum -> !name.isPresent() || vacuum.getName().toLowerCase().contains(name.get().toLowerCase()))
                .filter(vacuum -> !status.isPresent() || status.get().contains(vacuum.getStatus().name()))
                .filter(vacuum -> !(dateFrom.isPresent() && dateTo.isPresent())
                        || (vacuum.getDateAdded().after(dateFrom.get()) && vacuum.getDateAdded().before(dateTo.get()))
                ).collect(Collectors.toList());
    }

    public void scheduleOperation(Operation operation, Long id, Date date) {
        Runnable operationMethod;
        switch (operation) {
            case START:
                operationMethod = () -> startVacuum(id);
                break;
            case STOP:
                operationMethod = () -> stopVacuum(id);
                break;
            case DISCHARGE:
                operationMethod = () -> dischargeVacuum(id);
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + operation);
        }
        taskScheduler.schedule(operationMethod, date);
    }

    public void startVacuum(Long id) {
        taskExecutor.execute(() -> {

            Optional<Vacuum> optionalVacuum = getVacuumById(id);
            if (!optionalVacuum.isPresent()) {
                return;
            }
            Vacuum vacuum = optionalVacuum.get();
            if (vacuum.getStatus() != Vacuum.VacuumStatus.OFF) {
                return;
            }
            long userId = vacuum.getAddedByUser().getUserId();
            try {
                Thread.sleep(5000);
                vacuum.setStatus(Vacuum.VacuumStatus.ON);
                vacuumRepository.save(vacuum);
            } catch (InterruptedException e) {
                e.printStackTrace();
                addErrorMessage(new Date(), id, Operation.START, "Interrupted exception", userId);
            } catch (ObjectOptimisticLockingFailureException e) {
                System.out.println("Optimistic lock exception when starting vacuum: " + id);
                addErrorMessage(new Date(), id, Operation.START, "Optimistic lock exception", userId);
            }
        });
    }

    public void stopVacuum(Long id) {
        taskExecutor.execute(() -> {
            Optional<Vacuum> optionalVacuum = getVacuumById(id);
            if (!optionalVacuum.isPresent()) {
                return;
            }
            Vacuum vacuum = optionalVacuum.get();
            if (vacuum.getStatus() != Vacuum.VacuumStatus.ON) {
                return;
            }
            long userId = vacuum.getAddedByUser().getUserId();
            try {

                Thread.sleep(5000);
                vacuum.setStatus(Vacuum.VacuumStatus.OFF);
                boolean toDischarge = vacuum.getCycleCount() == 2;
                vacuum.setCycleCount((vacuum.getCycleCount() + 1) % 3);
                vacuumRepository.save(vacuum);

                if (toDischarge) {
                    dischargeVacuum(id);
                }

            } catch (InterruptedException e) {
                e.printStackTrace();
                addErrorMessage(new Date(), id, Operation.STOP, "Interrupted exception", userId);
            } catch (ObjectOptimisticLockingFailureException e) {
                System.out.println("Optimistic lock exception when stopping vacuum: " + id);
                addErrorMessage(new Date(), id, Operation.STOP, "Optimistic lock exception", userId);
            }
        });
    }

    public void dischargeVacuum(Long id) {
        taskExecutor.execute(() -> {
            Optional<Vacuum> optionalVacuum = getVacuumById(id);
            if (!optionalVacuum.isPresent()) {
                return;
            }
            Vacuum vacuum = optionalVacuum.get();
            if (vacuum.getStatus() != Vacuum.VacuumStatus.OFF) {
                return;
            }
            long userId = vacuum.getAddedByUser().getUserId();
            try {

                Thread.sleep(5000);
                vacuum.setStatus(Vacuum.VacuumStatus.DISCHARGING);
                vacuumRepository.save(vacuum);

                Thread.sleep(5000);
//                refresh the entity
                vacuum = getVacuumById(id).get();
                vacuum.setStatus(Vacuum.VacuumStatus.OFF);
                vacuumRepository.save(vacuum);
            } catch (InterruptedException e) {
                e.printStackTrace();
                addErrorMessage(new Date(), id, Operation.DISCHARGE, "Interrupted exception", userId);
            } catch (ObjectOptimisticLockingFailureException e) {
                System.out.println("Optimistic lock exception when discharging vacuum: " + id);
                addErrorMessage(new Date(), id, Operation.DISCHARGE, "Optimistic lock exception", userId);
            }
        });
    }

    private void addErrorMessage(Date date, Long id, Operation operation, String message, Long userId) {
        ErrorMessage errorMessage = new ErrorMessage(date, id, operation, message, userId);
        errorMessageService.addErrorMessage(errorMessage);
    }
}
