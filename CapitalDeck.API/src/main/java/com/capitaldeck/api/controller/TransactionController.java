package com.capitaldeck.api.controller;

import com.capitaldeck.api.model.Transaction;
import com.capitaldeck.api.model.User;
import com.capitaldeck.api.repository.TransactionRepository;
import com.capitaldeck.api.repository.UserRepository;
import com.capitaldeck.api.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // 1. Tells Spring "This class handles HTTP Requests"
@RequestMapping("/api/transactions") // 2. The Base URL
@CrossOrigin(origins = "http://localhost:5173") // 3. Allow React to talk to us
public class TransactionController {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    UserRepository userRepository;

    // Get the currently logged-in user
    private User getCurrentUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 1. GET ALL (FILTERED BY USER)
    @GetMapping
    public List<Transaction> getAllTransactions() {
        // Only get data for THIS user
        return transactionRepository.findByUserId(getCurrentUser().getId());
    }

    // 2. CREATE TRANSACTION (Assign to User)
    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        transaction.setUser(getCurrentUser()); // Automatically link to logged-in user
        return transactionRepository.save(transaction);
    }

    // 3. DELETE TRANSACTION (Security Check)
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        Transaction tx = transactionRepository.findById(id).orElseThrow();
        
        // SECURITY CHECK: Ensure user owns this transaction before deleting
        if (!tx.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized to delete this transaction");
        }
        
        transactionRepository.deleteById(id);
    }
}