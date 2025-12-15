package com.leasepeace.operator.controller;

import com.leasepeace.operator.domain.Property;
import com.leasepeace.operator.repository.PropertyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/operators/properties") // Gateway routes /operators/** to this service
public class PropertyController {

    private final PropertyRepository propertyRepository;

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @PostMapping
    public ResponseEntity<Property> createProperty(@RequestBody PropertyRequest request) {
        Property property = new Property(request.operatorId(), request.name(), request.address());
        return ResponseEntity.ok(propertyRepository.save(property));
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        return ResponseEntity.ok(propertyRepository.findAll());
    }

    public record PropertyRequest(UUID operatorId, String name, String address) {
    }
}
