package com.leasepeace.operator.repository;

import com.leasepeace.operator.domain.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface PropertyRepository extends JpaRepository<Property, UUID> {
    List<Property> findByOperatorId(UUID operatorId);
}
