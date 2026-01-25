package com.capitaldeck.api.controller;

import com.capitaldeck.api.model.Transaction;
import com.capitaldeck.api.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // 1. Tells Spring "This class handles HTTP Requests"
@RequestMapping("/api/transactions") // 2. The Base URL
@CrossOrigin(origins = "http://localhost:5173") // 3. Allow React to talk to us
public class TransactionController {

    // Dependency Injection: Inject the SERVICE, not the Repository
    @Autowired
    private TransactionService transactionService;

    // 1. GET Request
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    // 2. POST Request
    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        return ResponseEntity.ok(transactionService.createTransaction(transaction));
    }

    // 3. DELETE Request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build(); // Returns 204 No Content (Standard for Delete)
    }
}