package rs.raf.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.raf.demo.model.Vacuum;
import rs.raf.demo.repositories.VacuumRepository;

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
}
