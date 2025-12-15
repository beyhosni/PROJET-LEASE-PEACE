package com.leasepeace.matching.controller;

import com.leasepeace.matching.service.MatchingEngine;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/match")
public class MatchingController {
    private final MatchingEngine matchingEngine;

    public MatchingController(MatchingEngine matchingEngine) {
        this.matchingEngine = matchingEngine;
    }

    public record MatchRequest(Map<String, Object> profileA, Map<String, Object> profileB) {
    }

    public record MatchResponse(int score, String explanation) {
    }

    @PostMapping
    public ResponseEntity<MatchResponse> calculateMatch(@RequestBody MatchRequest request) {
        var result = matchingEngine.calculateMatch(request.profileA(), request.profileB());
        return ResponseEntity.ok(new MatchResponse(result.score(), result.explanation()));
    }

    public record BatchMatchRequest(Map<String, Object> myProfile, java.util.List<Map<String, Object>> candidates) {
    }

    @PostMapping("/batch")
    public ResponseEntity<java.util.List<MatchingEngine.BatchMatchResult>> batchMatch(
            @RequestBody BatchMatchRequest request) {
        return ResponseEntity.ok(matchingEngine.calculateBatch(request.myProfile(), request.candidates()));
    }
}
