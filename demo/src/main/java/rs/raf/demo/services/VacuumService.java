package rs.raf.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import rs.raf.demo.model.Vacuum;
import rs.raf.demo.repositories.VacuumRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VacuumService {
    private final VacuumRepository vacuumRepository;
    private final TaskExecutor taskExecutor;

    @Autowired
    public VacuumService(VacuumRepository vacuumRepository, TaskExecutor taskExecutor) {
        this.vacuumRepository = vacuumRepository;
        this.taskExecutor = taskExecutor;
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

    public List<Vacuum> searchVacuums() {

    }

    public void startVacuum(Long id) {
        taskExecutor.execute(() -> {
            try {
                Optional<Vacuum> optionalVacuum = getVacuumById(id);
                if (!optionalVacuum.isPresent()) {
                    return;
                }
                Vacuum vacuum = optionalVacuum.get();
                if (vacuum.getStatus() != Vacuum.VacuumStatus.OFF) {
                    return;
                }
                Thread.sleep(5000);
                vacuum.setStatus(Vacuum.VacuumStatus.ON);
                vacuumRepository.save(vacuum);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            } catch (ObjectOptimisticLockingFailureException e) {
                System.out.println("Optimistic lock exception when starting vacuum: " + id);
            }
        });
    }

    public void stopVacuum(Long id) {
        taskExecutor.execute(() -> {
            try {
                Optional<Vacuum> optionalVacuum = getVacuumById(id);
                if (!optionalVacuum.isPresent()) {
                    return;
                }
                Vacuum vacuum = optionalVacuum.get();
                if (vacuum.getStatus() != Vacuum.VacuumStatus.ON) {
                    return;
                }
                Thread.sleep(5000);
                vacuum.setStatus(Vacuum.VacuumStatus.OFF);
                vacuumRepository.save(vacuum);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ObjectOptimisticLockingFailureException e) {
                System.out.println("Optimistic lock exception when stopping vacuum: " + id);
            }
        });
    }

    public void dischargeVacuum(Long id) {
        taskExecutor.execute(() -> {
            try {
                Optional<Vacuum> optionalVacuum = getVacuumById(id);
                if (!optionalVacuum.isPresent()) {
                    return;
                }
                Vacuum vacuum = optionalVacuum.get();
                if (vacuum.getStatus() != Vacuum.VacuumStatus.OFF) {
                    return;
                }
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
            } catch (ObjectOptimisticLockingFailureException e) {
                System.out.println("Optimistic lock exception when discharging vacuum: " + id);
            }
        });
    }
}
