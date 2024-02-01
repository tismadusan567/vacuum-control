package rs.raf.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.raf.demo.model.Vacuum;

import java.util.Optional;

@Repository
public interface VacuumRepository extends JpaRepository<Vacuum, Long> {
    Optional<Vacuum> findByVacuumIdAndActiveIsTrue(Long id);
}
