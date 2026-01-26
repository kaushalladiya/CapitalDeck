package com.capitaldeck.api.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "payment_methods")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; // e.g., "HDFC Credit Card", "Cash"
    private String type; // "CARD", "CASH", "UPI"
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}