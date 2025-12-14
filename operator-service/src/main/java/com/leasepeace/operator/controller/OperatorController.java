package com.leasepeace.operator.controller;

import com.leasepeace.operator.domain.Property;
import com.leasepeace.operator.repository.PropertyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/operators/{operatorId}/properties")
public class OperatorController {
    private final PropertyRepository propertyRepository;

    public OperatorController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    record CreatePropertyRequest(String name, String address) {
    }

    @PostMapping
    public ResponseEntity<Property> createProperty(@PathVariable UUID operatorId,
            @RequestBody CreatePropertyRequest request) {
        Property property = new Property(operatorId, request.name(), request.address());
        return ResponseEntity.created(URI.create("/properties/" + property.getId()))
                .body(propertyRepository.save(property));
    }

    @GetMapping
    public ResponseEntity<List<Property>> getProperties(@PathVariable UUID operatorId) {
        return ResponseEntity.ok(propertyRepository.findByOperatorId(operatorId));
    }
}
