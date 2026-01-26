package com.capitaldeck.api.repository;

import com.capitaldeck.api.model.Debt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DebtRepository extends JpaRepository<Debt, Long> {
    List<Debt> findByUserId(Long userId);
}