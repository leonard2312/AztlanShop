package com.AztlanShop.service;

import java.util.HashMap;
import java.util.Map;

import com.AztlanShop.model.User;
import com.AztlanShop.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class LoginService {

    UserRepo urepo;
    @Autowired
    PasswordEncoder encoder;

    public LoginService(UserRepo urepo) {
        this.urepo = urepo;
    }

    public Map<String, String> loginfn(String username,String password) {
        User guser = urepo.findByUsername(username);
        Map<String, String> response = new HashMap<>();

        if (guser == null) {
            response.put("message", "User not found");
            return response;
        }

        if (!encoder.matches(password, guser.getPassword())) {
            response.put("message", "Invalid password");
            return response;
        }

        if (!guser.isVerified()) {
            response.put("message", "Please verify your email first");
            return response;
        }

        response.put("username", guser.getUsername());
        response.put("message", "Login successful");
        return response;
    }
}