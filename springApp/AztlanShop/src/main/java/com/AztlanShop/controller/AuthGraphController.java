package com.AztlanShop.controller;

import com.AztlanShop.model.User;
import com.AztlanShop.records.LoginInput;
import com.AztlanShop.records.RegisterInput;
import com.AztlanShop.repository.UserRepo;
import com.AztlanShop.service.LoginService;
import com.AztlanShop.service.OtpVerification;
import com.AztlanShop.service.RegisterService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import javax.crypto.SecretKey;
import java.util.HashMap;
import java.util.Map;

@Controller
public class AuthGraphController {

    private final RegisterService regSer;
    private final LoginService ls;
    private final OtpVerification ov;
    private final UserRepo userRepo;

    @Value("${jwt.secret}")
    private String skkey;
    private SecretKey Sign_key;

    @PostConstruct
    public void init() {
        this.Sign_key = Keys.hmacShaKeyFor(skkey.getBytes());
    }

    public AuthGraphController(RegisterService regSer, LoginService ls, OtpVerification ov, UserRepo userRepo) {
        this.regSer = regSer;
        this.ls = ls;
        this.ov = ov;
        this.userRepo = userRepo;
    }

    @QueryMapping
    public Map<String, String> getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepo.findByUsername(auth.getName());
        if (user == null) return Map.of("message", "User not found");

        return Map.of(
                "username", user.getUsername(),
                "email", user.getEmail(),
                "verified", String.valueOf(user.isVerified())
        );
    }

    @MutationMapping
    public Map<String, String> login(@Argument LoginInput input) {
        String username = input.username();
        String password = input.password();

        Map<String, String> result = ls.loginfn(username, password);

        if (result.get("username") != null) {
            String token = gentoken(username);

            Map<String, String> response = new HashMap<>(result);
            response.put("token", token);
            return response;
        }

        return Map.of("message", "Invalid credentials");
    }

    public String gentoken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new java.util.Date())
                .expiration(new java.util.Date(System.currentTimeMillis() + 3600000)) // 1 hora
                .signWith(Sign_key)
                .compact();
    }

    @MutationMapping
    public Map<String, String> verifyEmail(@Argument String email, @Argument String otp) {
        return ov.otpVerification(email, otp);
    }

    @MutationMapping
    public Map<String, String> register(@Argument RegisterInput input) {
        return regSer.Register(input.username(), input.email(), input.password());
    }
}