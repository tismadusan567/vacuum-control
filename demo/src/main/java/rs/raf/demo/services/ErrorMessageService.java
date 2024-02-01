package rs.raf.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.raf.demo.model.ErrorMessage;
import rs.raf.demo.repositories.ErrorMessageRepository;

@Service
public class ErrorMessageService {
    private final ErrorMessageRepository errorMessageRepository;

    @Autowired
    public ErrorMessageService(ErrorMessageRepository errorMessageRepository) {
        this.errorMessageRepository = errorMessageRepository;
    }

    public ErrorMessage addErrorMessage(ErrorMessage errorMessage) {
        return errorMessageRepository.save(errorMessage);
    }
}
