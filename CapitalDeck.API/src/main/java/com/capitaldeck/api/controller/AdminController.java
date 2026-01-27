package com.capitaldeck.api.controller;

import com.capitaldeck.api.model.User;
import com.capitaldeck.api.repository.UserRepository;
import com.capitaldeck.api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasRole('ADMIN')") // SECURITY CHECK: Only Admins can enter
public class AdminController {

    @Autowired UserRepository userRepository;
    @Autowired TransactionRepository transactionRepository;

    // 1. GET SYSTEM STATS (For the Admin Cards)
    @GetMapping("/stats")
    public ResponseEntity<?> getSystemStats() {
        long userCount = userRepository.count();
        long transactionCount = transactionRepository.count();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userCount);
        stats.put("totalTransactions", transactionCount);
        stats.put("systemStatus", "OPERATIONAL");
        stats.put("serverTime", System.currentTimeMillis());
        
        return ResponseEntity.ok(stats);
    }

    // 2. GET ALL USERS (For the Admin Table)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 3. DELETE USER (Moderation Action)
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.badRequest().body("User not found");
    }
}