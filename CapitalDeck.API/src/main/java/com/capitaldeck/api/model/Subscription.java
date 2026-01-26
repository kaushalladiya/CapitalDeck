package com.capitaldeck.api.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "subscriptions")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; // e.g., "Netflix", "Spotify"
    private Double cost;
    private String billingCycle; // "MONTHLY", "YEARLY"
    private LocalDate nextRenewalDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}