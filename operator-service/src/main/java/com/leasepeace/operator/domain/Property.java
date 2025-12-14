package com.leasepeace.operator.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID operatorId;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String address;

    // Default constructor for JPA
    public Property() {
    }

    public Property(UUID operatorId, String name, String address) {
        this.operatorId = operatorId;
        this.name = name;
        this.address = address;
    }

    // Getters
    public UUID getId() {
        return id;
    }

    public UUID getOperatorId() {
        return operatorId;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }
}
