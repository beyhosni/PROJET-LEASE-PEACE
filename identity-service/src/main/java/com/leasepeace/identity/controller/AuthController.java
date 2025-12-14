package com.leasepeace.identity.controller;

import com.leasepeace.identity.domain.User;
import com.leasepeace.identity.service.JwtService;
import com.leasepeace.identity.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    public record AuthRequest(String email, String password) {
    }

    public record AuthResponse(String token) {
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<User> userOpt = userService.findByEmail(request.email());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // TODO: Use PasswordEncoder.matches()
            // Simulating password check for MVP (assuming "HASH_" + pass logic from
            // Service)
            if (user.getPasswordHash().equals("HASH_" + request.password())) {
                String token = jwtService.generateToken(user.getId(), user.getRole().name());
                return ResponseEntity.ok(new AuthResponse(token));
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
