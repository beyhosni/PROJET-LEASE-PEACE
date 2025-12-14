package com.leasepeace.profile.controller;

import com.leasepeace.profile.domain.UserProfile;
import com.leasepeace.profile.repository.UserProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/profiles")
public class UserProfileController {
    private final UserProfileRepository profileRepository;

    public UserProfileController(UserProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<UserProfile> updateProfile(@PathVariable UUID userId,
            @RequestBody Map<String, Object> answers) {
        UserProfile profile = profileRepository.findByUserId(userId)
                .orElse(new UserProfile(userId, answers));

        profile.setAnswers(answers);
        return ResponseEntity.ok(profileRepository.save(profile));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfile> getProfile(@PathVariable UUID userId) {
        return profileRepository.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
