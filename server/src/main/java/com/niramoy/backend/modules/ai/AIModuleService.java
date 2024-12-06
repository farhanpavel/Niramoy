package com.niramoy.backend.modules.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class AIModuleService {

    private static final String API_KEY = "AIzaSyD4tJ9Gk9WFr7iTDZfeoP7aJcXynglhDVM";
    private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + API_KEY;

    private final RestTemplate restTemplate;
    private final ResourceLoader resourceLoader;

    @Autowired
    public AIModuleService(RestTemplate restTemplate, ResourceLoader resourceLoader) {
        this.restTemplate = restTemplate;
        this.resourceLoader = resourceLoader;
    }
    public String getHelloWorldMessage() {
        return "{\"message\": \"Hello, World!\"}";
    }

    public String getRawJson(){
        Resource resource = resourceLoader.getResource("classpath:raw/template.json");
        try {
            byte[] fileData = Files.readAllBytes(Paths.get(resource.getURI()));
            return new String(fileData);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String handleAiPrompt(String prompt) {
        String templateJson = getRawJson().replace("\"", "\\\"");
        StringBuilder sb = new StringBuilder(prompt);
        sb.append(" Please provide a response in a structured JSON format (values in bangla language keys in said format) that matches the following model: ");
        sb.append(templateJson);
        sb.append(" Make sure no youtube link is example link or defined your_yt_link or something non renderable..must be real youtube link" );

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        String requestBody = "{\"contents\":[{\"parts\":[{\"text\":\"" + sb.toString() + "\"}]}]}";
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            String jsonResponse = rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
            return jsonResponse.replace("```json\n", "").replace("\n```", "");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}