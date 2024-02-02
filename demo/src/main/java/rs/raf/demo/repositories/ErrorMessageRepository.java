package rs.raf.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.raf.demo.model.ErrorMessage;

import java.util.List;

public interface ErrorMessageRepository extends JpaRepository<ErrorMessage, Long> {
    List<ErrorMessage> findAllByVacuumOwner(Long vacuumOwner);
}
