package rs.raf.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
public class VacuumDTO {
    private final Long vacuumId;
    private final String name;
    private final Vacuum.VacuumStatus status;
    private final boolean active;
    private final Date dateAdded;
    private final Long addedByUserId;
    private final Integer version;

    public VacuumDTO(Vacuum vacuum) {
        vacuumId = vacuum.getVacuumId();
        name = vacuum.getName();
        status = vacuum.getStatus();
        active = vacuum.isActive();
        dateAdded = vacuum.getDateAdded();
        addedByUserId = vacuum.getAddedByUser().getUserId();
        version = vacuum.getVersion();
    }

}
