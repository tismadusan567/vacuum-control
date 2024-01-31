package rs.raf.demo.bootstrap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import rs.raf.demo.model.*;
import rs.raf.demo.repositories.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Component
public class BootstrapData implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VacuumRepository vacuumRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public BootstrapData(UserRepository userRepository, PasswordEncoder passwordEncoder, VacuumRepository vacuumRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.vacuumRepository = vacuumRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Loading Data...");

        User user1 = new User();
        user1.setFirstName("user1");
        user1.setLastName("1111");

        user1.setPassword(this.passwordEncoder.encode("user1"));
        user1.setEmail("user1@gmail.com");
        this.userRepository.save(user1);

        User user2 = new User();
        user2.setFirstName("user2");
        user2.setLastName("2222");
        user2.setPassword(this.passwordEncoder.encode("user2"));
        user2.setEmail("user2@gmail.com");
        user2.setPermissions(Permissions.permissionToInt.get(Permissions.Permission.can_read_users));
        this.userRepository.save(user2);

        User user3 = new User();
        user3.setFirstName("user3");
        user3.setLastName("3333");
        user3.setPassword(this.passwordEncoder.encode("user3"));
        user3.setEmail("user3@gmail.com");
        user3.addPermission(Permissions.Permission.can_read_users);
        user3.addPermission(Permissions.Permission.can_update_users);
        user3.addPermission(Permissions.Permission.can_create_users);
        user3.addPermission(Permissions.Permission.can_delete_users);
        this.userRepository.save(user3);

        Vacuum vacuum1 = new Vacuum();
        vacuum1.setName("vacuum1");
        vacuum1.setActive(true);
        vacuum1.setStatus(Vacuum.VacuumStatus.ON);
        vacuum1.setAddedByUser(user1);
        vacuum1.setDateAdded(new Date());
        vacuumRepository.save(vacuum1);


        System.out.println("Data loaded!");
    }
}
