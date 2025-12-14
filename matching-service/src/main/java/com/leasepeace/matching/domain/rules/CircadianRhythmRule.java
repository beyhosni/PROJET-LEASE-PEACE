package com.leasepeace.matching.domain.rules;

import com.leasepeace.matching.domain.MatchingRule;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class CircadianRhythmRule implements MatchingRule {

    @Override
    public double calculateScore(Map<String, Object> p1, Map<String, Object> p2) {
        String r1 = (String) p1.getOrDefault("circadian_rhythm", "REGULAR");
        String r2 = (String) p2.getOrDefault("circadian_rhythm", "REGULAR");

        if (r1.equals(r2))
            return 1.0;

        // Simplified Logic: Early Bird vs Night Owl = 0.2, Regular vs either = 0.6
        if ((r1.equals("EARLY_BIRD") && r2.equals("NIGHT_OWL")) ||
                (r1.equals("NIGHT_OWL") && r2.equals("EARLY_BIRD"))) {
            return 0.2;
        }
        return 0.6;
    }

    @Override
    public String getName() {
        return "Rythme de vie";
    }

    @Override
    public double getWeight() {
        return 0.30;
    }

    @Override
    public String getExplanation(double score) {
        if (score >= 0.9)
            return "Rythmes de sommeil parfaitement synchronisés.";
        if (score <= 0.3)
            return "Attention : décalage important des rythmes de vie.";
        return "Rythmes différents mais compatibles.";
    }
}
