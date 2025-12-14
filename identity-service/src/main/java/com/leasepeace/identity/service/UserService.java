package com.leasepeace.identity.service;

import com.leasepeace.identity.domain.User;
import com.leasepeace.identity.domain.UserRole;
import com.leasepeace.identity.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(String email, String rawPassword, UserRole role) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        // TODO: Use real PasswordEncoder
        String passwordHash = "HASH_" + rawPassword;
        return userRepository.save(new User(email, passwordHash, role));
    }

    public Optional<User> getUser(UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
