package dev.jeevankaware.portfolio.config.service;

public interface EmailService {

    void sendEmail(
            String to,
            String subject,
            String message
    );

}