package com.capitaldeck.api.controller;

import com.capitaldeck.api.model.*;
import com.capitaldeck.api.repository.*;
import com.capitaldeck.api.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired CategoryRepository categoryRepository;
    @Autowired FinancialGoalRepository goalRepository;
    @Autowired BudgetRepository budgetRepository;
    @Autowired InvestmentRepository investmentRepository;
    @Autowired DebtRepository debtRepository;
    @Autowired SubscriptionRepository subscriptionRepository;
    @Autowired NotificationRepository notificationRepository;
    @Autowired UserRepository userRepository;

    private User getCurrentUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findById(userDetails.getId()).orElseThrow();
    }

    // AGGREGATE DATA ENDPOINT
    @GetMapping("/summary")
    public Map<String, Object> getDashboardSummary() {
        Long userId = getCurrentUser().getId();
        Map<String, Object> data = new HashMap<>();
        
        data.put("investments", investmentRepository.findByUserId(userId));
        data.put("debts", debtRepository.findByUserId(userId));
        data.put("goals", goalRepository.findByUserId(userId));
        data.put("subscriptions", subscriptionRepository.findByUserId(userId));
        // You can add notifications here if needed in future
        return data;
    }

    // INDIVIDUAL ENDPOINTS
    @PostMapping("/investments")
    public Investment addInvestment(@RequestBody Investment investment) {
        investment.setUser(getCurrentUser());
        return investmentRepository.save(investment);
    }

    @PostMapping("/debts")
    public Debt addDebt(@RequestBody Debt debt) {
        debt.setUser(getCurrentUser());
        return debtRepository.save(debt);
    }
    
    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        category.setUser(getCurrentUser());
        return categoryRepository.save(category);
    }

    @PostMapping("/goals")
    public FinancialGoal addGoal(@RequestBody FinancialGoal goal) {
        goal.setUser(getCurrentUser());
        return goalRepository.save(goal);
    }

    @DeleteMapping("/goals/{id}")
    public void deleteGoal(@PathVariable Long id) {
        // Security check: Ensure the goal belongs to the user
        FinancialGoal goal = goalRepository.findById(id).orElseThrow();
        if(goal.getUser().getId().equals(getCurrentUser().getId())) {
            goalRepository.deleteById(id);
        }
    }
}