package com.AztlanShop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailService {

    private final JavaMailSender jms;

    @Value("${spring.mail.username}")
    private String originMail;

    public EmailService(JavaMailSender jms) {
        this.jms = jms;
    }
    public void sendotp(String mail,String otp) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(originMail);
        msg.setTo(mail);
        msg.setSubject("OTP code for Aztlan Shop");
        msg.setText("Hello welcome to Aztlan Shop your one time password is : " + otp );
        jms.send(msg);
    }
}