package com.AztlanShop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailService {

    private final JavaMailSender jms;

    public EmailService(JavaMailSender jms) {
        this.jms = jms;
    }
    public void sendotp(String mail,String otp) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("scam2023b@gmail.com");
        msg.setTo(mail);
        msg.setSubject("OTP code for Vcode Acedmey ");
        msg.setText("Hello welcome to the Vcode Acedmey and your Otp is : " + otp );
        jms.send(msg);
    }
}