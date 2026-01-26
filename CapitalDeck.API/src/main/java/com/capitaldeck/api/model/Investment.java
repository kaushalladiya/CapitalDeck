package com.capitaldeck.api.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "investments")
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; // e.g., "Reliance Industries"
    private String type; // "STOCK", "MUTUAL_FUND", "FD"
    private Double investedAmount;
    private Double currentValue;
    private LocalDate investmentDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}