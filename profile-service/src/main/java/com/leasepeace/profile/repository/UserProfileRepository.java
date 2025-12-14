package com.leasepeace.profile.repository;

import com.leasepeace.profile.domain.UserProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.UUID;

public interface UserProfileRepository extends MongoRepository<UserProfile, String> {
    Optional<UserProfile> findByUserId(UUID userId);
}
