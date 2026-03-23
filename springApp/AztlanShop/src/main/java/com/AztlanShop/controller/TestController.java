package com.AztlanShop.controller;

import com.AztlanShop.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {
    @Autowired
    EmailService emailService;

    @GetMapping("/test-email/{email}")
    public ResponseEntity<String> sendTestEmail(@PathVariable String email){
        try {
            emailService.sendotp(email, "Test message");
            return new ResponseEntity<>("Email send successfully!", HttpStatus.OK);
        }catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
    }

    @GetMapping("/pruebaToken")
    public ResponseEntity<String> pruebaT(){
        return new ResponseEntity<>("Success trial!", HttpStatus.OK);
    }
}
