package com.capitaldeck.api.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "debts")
public class Debt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String lenderName; // e.g., "SBI Home Loan"
    private Double amount;
    private Double interestRate;
    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}