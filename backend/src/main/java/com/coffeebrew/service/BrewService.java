package com.coffeebrew.service;

import com.coffeebrew.entity.Brew;
import com.coffeebrew.repository.BrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BrewService {
    private final BrewRepository brewRepository;

    public List<Brew> findAll() {
        return brewRepository.findAll();
    }

    public List<Brew> findByMethod(String method) {
        return brewRepository.findByBrewMethodIgnoreCase(method);
    }

    public Optional<Brew> findById(Long id) {
        return brewRepository.findById(id);
    }

    public Brew save(Brew brew) {
        return brewRepository.save(brew);
    }

    public void delete(Long id) {
        brewRepository.deleteById(id);
    }
}