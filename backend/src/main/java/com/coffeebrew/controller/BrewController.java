package com.coffeebrew.controller;

import com.coffeebrew.entity.Brew;
import com.coffeebrew.service.BrewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brews")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BrewController {
    private final BrewService brewService;

    @GetMapping
    public ResponseEntity<List<Brew>> getAll(@RequestParam(required = false) String method) {
        List<Brew> brews = method != null ? brewService.findByMethod(method) : brewService.findAll();
        return ResponseEntity.ok(brews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brew> getById(@PathVariable Long id) {
        return brewService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Brew> create(@Valid @RequestBody Brew brew) {
        Brew saved = brewService.save(brew);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brew> update(@PathVariable Long id, @Valid @RequestBody Brew brew) {
        if (!brewService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        brew.setId(id);
        return ResponseEntity.ok(brewService.save(brew));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!brewService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        brewService.delete(id);
        return ResponseEntity.noContent().build();
    }
}