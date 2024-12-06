package com.niramoy.backend.modules.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AIModuleController {

    private final AIModuleService aiModuleService;

    @Autowired
    public AIModuleController(AIModuleService aiModuleService) {
        this.aiModuleService = aiModuleService;
    }

    @PostMapping("/ai/niramoy")
    public String handleAI(@RequestBody Map<String, String> requestBody) {
        String prompt = requestBody.get("prompt");
        return aiModuleService.handleAiPrompt(prompt);
    }

    @PostMapping("/ai/recipe")
    public String handleRecipeAI(@RequestBody Map<String, String> requestBody) {
        String prompt = requestBody.get("prompt");
        return aiModuleService.recipeDescription(prompt);
    }

    @PostMapping("/ai/exercise")
    public String handleExerciseAI(@RequestBody Map<String, String> requestBody) {
        String prompt = requestBody.get("prompt");
        return aiModuleService.exerciseDescription(prompt);
    }
}