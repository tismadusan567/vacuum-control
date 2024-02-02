package rs.raf.demo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ErrorMessage {
    public ErrorMessage(Date dateOfError, Long vacuumId, Operation operation, String message, Long vacuumOwner) {
        this.dateOfError = dateOfError;
        this.vacuumId = vacuumId;
        this.operation = operation;
        this.message = message;
        this.vacuumOwner = vacuumOwner;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    Date dateOfError;

    Long vacuumId;

    @Enumerated(EnumType.STRING)
    Operation operation;

    String message;

    Long vacuumOwner;
}
