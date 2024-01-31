package rs.raf.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rs.raf.demo.model.User;
import rs.raf.demo.model.Vacuum;
import rs.raf.demo.services.UserService;
import rs.raf.demo.services.VacuumService;

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
}
