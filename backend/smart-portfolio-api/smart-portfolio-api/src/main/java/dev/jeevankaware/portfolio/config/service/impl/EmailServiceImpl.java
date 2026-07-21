package dev.jeevankaware.portfolio.config.service.impl;

import dev.jeevankaware.portfolio.config.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${MAIL_USERNAME}")
    private String mailUsername;

    @Override
    public void sendEmail(
            String to,
            String subject,
            String message
    ) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom(mailUsername);
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(message);

        javaMailSender.send(mail);

    }
}