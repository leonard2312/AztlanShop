package com.AztlanShop.service;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import com.AztlanShop.model.Otp;
import com.AztlanShop.model.User;
import com.AztlanShop.repository.OtpRepo;
import com.AztlanShop.repository.RegRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtpVerification {

    @Autowired
    RegisterService resServ;

    OtpRepo otp_repo;
    RegRepo reg_repo;

    OtpVerification() {
    }


    @Autowired
    public OtpVerification(OtpRepo otp_repo, RegRepo reg_repo) {

        this.otp_repo = otp_repo;
        this.reg_repo = reg_repo;
    }



    public Map<String, String> otpVerification(String email,String enteredotp) {
        Map<String, String>  response = new HashMap<>();
        User user = reg_repo.findByEmail(email);
        if(user ==  null) {
            response.put("success", "false");
            response.put("message", "User not found");
            return response;
        }
        Otp otp_entity = otp_repo.findByUser(user);
        if(otp_entity == null) {
            response.put("success", "false");
            response.put("message", "Otp not found");
            return response;
        }

        if(otp_entity.getExpirytime().before(new Timestamp(System.currentTimeMillis()))) {
            resServ.reSendOtp(user,otp_entity);
            response.put("success", "false");
            response.put("message", "Otp expired sending a new one");
            return response;
        }

        if(!otp_entity.getOtp_code().equals(enteredotp)) {
            response.put("success", "false");
            response.put("message", "Otp Invalid");
            return response;
        }

        user.setVerified(true);
        reg_repo.save(user);

        otp_repo.delete(otp_entity);

        response.put("success", "true");
        response.put("message", "Otp verified Successfully");

        return response;
    }

}