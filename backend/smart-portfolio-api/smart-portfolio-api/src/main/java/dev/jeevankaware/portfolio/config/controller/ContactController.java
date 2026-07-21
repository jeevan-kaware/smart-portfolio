package dev.jeevankaware.portfolio.config.controller;

import dev.jeevankaware.portfolio.config.dto.ContactRequest;
import dev.jeevankaware.portfolio.config.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8081/")
public class ContactController {

    private final EmailService emailService;

    @PostMapping
    public Map<String, Object> submit(
            @Valid @RequestBody ContactRequest request
    ) {

        String subject = "New Portfolio Contact Form";

        String body = """
                ==============================

                Name : %s

                Email : %s

                Message :

                %s

                ==============================
                """
                .formatted(
                        request.name(),
                        request.email(),
                        request.message()
                );

        emailService.sendEmail(
                "jeevan.kaware.dev@gmail.com",
                subject,
                body
        );

        return Map.of(
                "success", true,
                "message", "Message sent successfully.",
                "receivedAt", Instant.now().toString()
        );
    }

}