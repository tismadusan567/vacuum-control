package rs.raf.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rs.raf.demo.model.AddVacuumDTO;
import rs.raf.demo.model.User;
import rs.raf.demo.model.Vacuum;
import rs.raf.demo.services.UserService;
import rs.raf.demo.services.VacuumService;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vacuum")
@CrossOrigin(origins = "http://localhost:4200")
public class VacuumController {
    private final VacuumService vacuumService;
    private final UserService userService;

    @Autowired
    public VacuumController(VacuumService vacuumService, UserService userService) {
        this.vacuumService = vacuumService;
        this.userService = userService;
    }

    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAuthority('can_search_vacuum')")
    public ResponseEntity<?> searchVacuum(
            @RequestParam Optional<String> name,
            @RequestParam Optional<List<String>> status,
            @RequestParam @DateTimeFormat(pattern="MM.dd.yyyy") Optional<Date> dateFrom,
            @RequestParam @DateTimeFormat(pattern="MM.dd.yyyy") Optional<Date> dateTo
    ) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();

            List<Vacuum> vacuums = userService.getUserByEmail(email).
                    getVacuums().stream()
                    .filter(Vacuum::isActive)
                    .filter(vacuum -> !name.isPresent() || vacuum.getName().toLowerCase().contains(name.get().toLowerCase()))
                    .filter(vacuum -> !status.isPresent() || status.get().contains(vacuum.getStatus().name()))
                    .filter(vacuum -> !(dateFrom.isPresent() && dateTo.isPresent())
                            || (vacuum.getDateAdded().after(dateFrom.get()) && vacuum.getDateAdded().before(dateTo.get()))
                    )
                    .collect(Collectors.toList());

            return ResponseEntity.ok(vacuums);
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAuthority('can_search_vacuum')")
    public ResponseEntity<?> addVacuum(@Valid @RequestBody AddVacuumDTO vacuumDTO) {
        System.out.println(vacuumDTO);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);

        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Vacuum vacuum = new Vacuum();
        vacuum.setName(vacuumDTO.getName());
        vacuum.setActive(vacuumDTO.isActive());
        vacuum.setDateAdded(new Date());
        vacuum.setStatus(Vacuum.VacuumStatus.OFF);
        vacuum.setAddedByUser(user);

        Vacuum res = vacuumService.addVacuum(vacuum);

        return res != null ? ResponseEntity.ok(res) : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @DeleteMapping(value = "/remove/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAuthority('can_remove_vacuums')")
    public ResponseEntity<?> removeVacuum(@PathVariable("id") Long id) {
        return vacuumService.deleteVacuumById(id) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
}
