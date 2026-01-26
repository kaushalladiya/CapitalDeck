package com.capitaldeck.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity // 1. Map this class to a Database Table
@Data   // 2. Auto-generate Getters/Setters (Lombok)
@Table(name = "transactions") // 3. Name the table explicitly
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-Increment ID
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Double amount;

    // "INCOME" or "EXPENSE"
    @Column(nullable = false)
    private String type;

    // "Food", "Salary", "Rent"
    @Column(nullable = false)
    private String category;

    // Automatically set the date when created
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // This runs automatically before saving to DB
    @PrePersist
    protected void onCreate() {
        date = LocalDateTime.now();
    }
}