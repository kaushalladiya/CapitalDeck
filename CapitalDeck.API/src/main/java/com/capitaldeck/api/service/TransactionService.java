package com.capitaldeck.api.service;

import com.capitaldeck.api.model.Transaction;
import com.capitaldeck.api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Tells Spring: "This class holds the Business Logic"
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // 1. Get All Transactions
    public List<Transaction> getAllTransactions() {
        // In the future, we can add sorting or filtering logic here
        return transactionRepository.findAll();
    }

    // 2. Create Transaction
    public Transaction createTransaction(Transaction transaction) {
        // Business Logic Example: Validate amount is positive
        if (transaction.getAmount() < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }
        return transactionRepository.save(transaction);
    }

    // 3. Delete Transaction
    public void deleteTransaction(Long id) {
        boolean exists = transactionRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Transaction with ID " + id + " does not exist");
        }
        transactionRepository.deleteById(id);
    }
}