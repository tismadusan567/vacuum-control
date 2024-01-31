package rs.raf.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Getter
@Setter
public class Vacuum {

    public enum VacuumStatus {
        ON, OFF, DISCHARGING
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vacuumId;

    @Column
    private String name;

    @Enumerated(EnumType.STRING)
    private VacuumStatus status;

    @Column
    private boolean active;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateAdded;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User addedByUser;

    @Version
    private Integer version = 0;
}
