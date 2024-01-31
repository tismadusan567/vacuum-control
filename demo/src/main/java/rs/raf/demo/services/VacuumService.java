package rs.raf.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import rs.raf.demo.model.Vacuum;
import rs.raf.demo.repositories.VacuumRepository;

import java.util.Optional;

@Service
public class VacuumService {
    private final VacuumRepository vacuumRepository;

    @Autowired
    public VacuumService(VacuumRepository vacuumRepository) {
        this.vacuumRepository = vacuumRepository;
    }

    public Vacuum addVacuum(Vacuum vacuum) {
        return vacuumRepository.save(vacuum);
    }

    public Optional<Vacuum> getVacuumById(Long id) {
        return vacuumRepository.findById(id);
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
}
