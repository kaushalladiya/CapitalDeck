package com.capitaldeck.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g., "Food", "Travel"
    private String type; // "INCOME" or "EXPENSE"
    private String icon; // e.g., "pizza-slice"

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Each user has their own custom categories
}