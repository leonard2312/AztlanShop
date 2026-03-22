package com.AztlanShop.repository;
import com.AztlanShop.model.Otp;
import com.AztlanShop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtpRepo extends JpaRepository<Otp, Long> {
    Otp findByUser(User user);
}