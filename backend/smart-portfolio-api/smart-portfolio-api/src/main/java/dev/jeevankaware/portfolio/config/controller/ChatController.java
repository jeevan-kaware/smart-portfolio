package dev.jeevankaware.portfolio.config.controller;

import dev.jeevankaware.portfolio.config.dto.ChatRequest;
import dev.jeevankaware.portfolio.config.dto.ChatResponse;
import dev.jeevankaware.portfolio.config.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:8081/")
public class ChatController {

  private final ChatService chatService;

  public ChatController(ChatService chatService) {
    this.chatService = chatService;
  }

  @PostMapping
  public ChatResponse chat(@Valid @RequestBody ChatRequest request) {
    return new ChatResponse(chatService.reply(request.message()));
  }
}