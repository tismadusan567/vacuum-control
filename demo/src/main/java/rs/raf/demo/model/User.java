package rs.raf.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @Column
    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Column
    @NotBlank(message = "Password is mandatory")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(unique = true)
    @NotBlank(message = "Email is mandatory")
    private String email;

    @Column
    @ColumnDefault("0")
    private int permissions = 0;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "addedByUser", orphanRemoval = true)
    @JsonManagedReference
    private List<Vacuum> vacuums = new ArrayList<>();

    public void addPermission(Permissions.Permission permission) {
        permissions |= Permissions.permissionToInt.get(permission);
    }

    public List<Permissions.Permission> getPermissionsAsList() {
//        List<Permissions.Permission> permissionList = new ArrayList<>();
//        for (Permissions.Permission p : Permissions.Permission.values()) {
//            if ((Permissions.permissionToInt.get(p) & permissions) > 0) {
//                permissionList.add(p);
//            }
//        }
        return Arrays.stream(Permissions.Permission.values())
                .filter((p) -> (Permissions.permissionToInt.get(p) & permissions) > 0)
                .collect(Collectors.toList());
    }

}
