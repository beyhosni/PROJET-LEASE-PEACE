package com.leasepeace.matching.service;

import com.leasepeace.matching.domain.MatchingRule;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MatchingEngine {
    private final List<MatchingRule> rules;

    public MatchingEngine(List<MatchingRule> rules) {
        this.rules = rules;
    }

    public MatchResult calculateMatch(Map<String, Object> p1, Map<String, Object> p2) {
        double totalScore = 0;
        double totalWeight = 0;
        StringBuilder explanation = new StringBuilder();

        for (MatchingRule rule : rules) {
            double score = rule.calculateScore(p1, p2);
            totalScore += score * rule.getWeight();
            totalWeight += rule.getWeight();

            explanation.append("- ").append(rule.getName()).append(": ")
                    .append(rule.getExplanation(score)).append("\n");
        }

        double finalScore = (totalWeight > 0) ? (totalScore / totalWeight) * 100 : 0;
        return new MatchResult((int) finalScore, explanation.toString());
    }

    public record MatchResult(int score, String explanation) {
    }
}
