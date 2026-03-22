package com.AztlanShop.service;

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.util.HashMap;

import java.util.Map;


import com.AztlanShop.model.Otp;
import com.AztlanShop.model.User;
import com.AztlanShop.repository.OtpRepo;
import com.AztlanShop.repository.RegRepo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    private final OtpRepo otp_repo;
    private final EmailService ems;
    private final RegRepo regrepo;
    private final BCryptPasswordEncoder passwordEncoder;



    public RegisterService(OtpRepo otp_repo, RegRepo regrepo, BCryptPasswordEncoder passwordEncoder, EmailService ems) {
        super();
        this.ems = ems;
        this.otp_repo = otp_repo;
        this.regrepo = regrepo;
        this.passwordEncoder = passwordEncoder;
    }



    public Map<String, String> Register(String username, String email, String password) {

        Map<String, String> response = new HashMap<>();

        User exuser = regrepo.findByEmail(email);

        if (exuser != null) {
            response.put("success", "false");
            response.put("message", "Email already exists");
            return response;
        }

        String hashedpassword = passwordEncoder.encode(password);

        User newuser = new User();
        newuser.setUsername(username);
        newuser.setEmail(email);
        newuser.setPassword(hashedpassword);
        newuser.setVerified(false);

        SecureRandom SR = new SecureRandom();
        int otp =  SR.nextInt(100000,999999);
        String sotp = String.valueOf(otp);
        Otp uotp = new Otp();
        uotp.setUser(newuser);
        uotp.setOtp_code(sotp);
        uotp.setExpirytime(new Timestamp(System.currentTimeMillis() + 5 *60*1000));
        regrepo.save(newuser);
        otp_repo.save(uotp);
        response.put("success", "true");
        response.put("message", "User registered successfully");
        ems.sendotp(email, sotp);

        return response;
    }
}