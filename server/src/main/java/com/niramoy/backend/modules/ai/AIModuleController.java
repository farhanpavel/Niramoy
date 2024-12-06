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

//    @GetMapping("/ai/template")
//    public String getRawJson() {
//        return aiModuleService.getRawJson();
//    }
}