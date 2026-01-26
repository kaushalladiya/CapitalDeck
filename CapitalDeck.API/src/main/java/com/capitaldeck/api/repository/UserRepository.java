package com.capitaldeck.api.repository;

import com.capitaldeck.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Custom query to find a user by email
    // Returns "Optional" because the user might not exist
    Optional<User> findByEmail(String email);

    // Check if an email is already taken (for Registration)
    Boolean existsByEmail(String email);
}