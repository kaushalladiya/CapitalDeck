package com.capitaldeck.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "financial_goals")
public class FinancialGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;         // e.g., "Buy Mac Mini"
    private Double targetAmount; // ₹60,000
    private Double savedAmount;  // ₹10,000
    private LocalDate deadline;  

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}