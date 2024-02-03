package rs.raf.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Vacuum {

    public Vacuum(String name, VacuumStatus status, boolean active, Date dateAdded, User addedByUser) {
        this.name = name;
        this.status = status;
        this.active = active;
        this.dateAdded = dateAdded;
        this.addedByUser = addedByUser;
    }

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

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateAdded;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User addedByUser;

    @Column
    private Integer cycleCount = 0;

    @Column
    private boolean active;

    //zasto optimistic a ne pessimistic?
    @Version
    private Integer version = 0;
}
