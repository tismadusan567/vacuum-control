package rs.raf.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rs.raf.demo.model.*;
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

    @PostMapping(value = "/start/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAuthority('can_start_vacuum')")
    public ResponseEntity<?> start(@PathVariable("id") Long id, @RequestParam @DateTimeFormat(pattern="MM.dd.yyyy HH:mm:ss") Optional<Date> scheduleDate) {
        if (!scheduleDate.isPresent()) {
            vacuumService.startVacuum(id);
        } else {
            vacuumService.scheduleOperation(Operation.START, id, scheduleDate.get());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/stop/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAuthority('can_stop_vacuum')")
    public ResponseEntity<?> stop(@PathVariable("id") Long id, @RequestParam @DateTimeFormat(pattern="MM.dd.yyyy HH:mm:ss") Optional<Date> scheduleDate) {
        if (!scheduleDate.isPresent()) {
            vacuumService.stopVacuum(id);
        } else {
            vacuumService.scheduleOperation(Operation.STOP, id, scheduleDate.get());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/discharge/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAuthority('can_discharge_vacuum')")
    public ResponseEntity<?> discharge(@PathVariable("id") Long id, @RequestParam @DateTimeFormat(pattern="MM.dd.yyyy HH:mm:ss") Optional<Date> scheduleDate) {
        if (!scheduleDate.isPresent()) {
            vacuumService.dischargeVacuum(id);
        } else {
            vacuumService.scheduleOperation(Operation.DISCHARGE, id, scheduleDate.get());
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAuthority('can_search_vacuum')")
    public ResponseEntity<?> search(
            @RequestParam Optional<String> name,
            @RequestParam Optional<List<String>> status,
            @RequestParam @DateTimeFormat(pattern="MM.dd.yyyy") Optional<Date> dateFrom,
            @RequestParam @DateTimeFormat(pattern="MM.dd.yyyy") Optional<Date> dateTo
    ) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.getUserByEmail(email);

            List<VacuumDTO> vacuums = vacuumService.searchVacuums(user, name, status, dateFrom, dateTo)
                    .stream()
                    .map(VacuumDTO::new)
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
    public ResponseEntity<?> add(@RequestParam String name) {
        System.out.println(name);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);

        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Vacuum vacuum = new Vacuum(name, Vacuum.VacuumStatus.OFF, true, new Date(), user);

        Vacuum res = vacuumService.addVacuum(vacuum);

        return res != null ? ResponseEntity.ok(new VacuumDTO(res)) : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @DeleteMapping(value = "/remove/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAuthority('can_remove_vacuums')")
    public ResponseEntity<?> remove(@PathVariable("id") Long id) {
        return vacuumService.deleteVacuumById(id) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
}
