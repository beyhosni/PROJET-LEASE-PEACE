package com.leasepeace.matching.domain;

import java.util.Map;

public interface MatchingRule {
    /**
     * Calculates score between 0.0 and 1.0
     */
    double calculateScore(Map<String, Object> p1, Map<String, Object> p2);

    String getName();

    double getWeight();

    String getExplanation(double score);
}
