package com.capitaldeck.api.repository;

import com.capitaldeck.api.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    // CUSTOM QUERY (Magic Method)
    // Spring sees "findByType" and automatically writes: 
    // "SELECT * FROM transactions WHERE type = ?"
    List<Transaction> findByType(String type);
    List<Transaction> findByUserId(Long userId);
}