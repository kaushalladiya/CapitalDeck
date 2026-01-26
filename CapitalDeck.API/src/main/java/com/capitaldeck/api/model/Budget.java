package com.capitaldeck.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "budgets")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount; // Limit: ₹5000
    private String month;  // "JAN-2026"

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category; // Budget for which category?

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}