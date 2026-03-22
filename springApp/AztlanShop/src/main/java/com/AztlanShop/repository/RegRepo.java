package com.AztlanShop.repository;

import com.AztlanShop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
}
