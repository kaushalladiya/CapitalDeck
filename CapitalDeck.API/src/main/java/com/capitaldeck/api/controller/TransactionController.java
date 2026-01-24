package com.capitaldeck.api.controller;

import com.capitaldeck.api.model.Transaction;
import com.capitaldeck.api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // 1. Tells Spring "This class handles HTTP Requests"
@RequestMapping("/api/transactions") // 2. The Base URL
@CrossOrigin(origins = "http://localhost:5173") // 3. Allow React to talk to us
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    // 1. GET Request: Returns a list of all transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // 2. POST Request: React sends JSON, we save it to Database
    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}