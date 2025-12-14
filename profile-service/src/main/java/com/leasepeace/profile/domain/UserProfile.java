package com.leasepeace.profile.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;
import java.util.UUID;

@Document(collection = "profiles")
public class UserProfile {
    @Id
    private String id;
    private UUID userId;
    private Map<String, Object> answers;
    private long lastUpdated;

    public UserProfile() {
    }

    public UserProfile(UUID userId, Map<String, Object> answers) {
        this.userId = userId;
        this.answers = answers;
        this.lastUpdated = System.currentTimeMillis();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public Map<String, Object> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, Object> answers) {
        this.answers = answers;
    }

    public long getLastUpdated() {
        return lastUpdated;
    }
}
