package rs.raf.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.raf.demo.model.ErrorMessage;
import rs.raf.demo.repositories.ErrorMessageRepository;

import java.util.List;

@Service
public class ErrorMessageService {
    private final ErrorMessageRepository errorMessageRepository;

    @Autowired
    public ErrorMessageService(ErrorMessageRepository errorMessageRepository) {
        this.errorMessageRepository = errorMessageRepository;
    }

    public List<ErrorMessage> getErrorMessagesForUser(Long userId) {
        return errorMessageRepository.findAllByVacuumOwner(userId);
    }

    public ErrorMessage addErrorMessage(ErrorMessage errorMessage) {
        return errorMessageRepository.save(errorMessage);
    }
}
