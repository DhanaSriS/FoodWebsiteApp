package com.example.backend.controllers;

import com.example.backend.models.customerModel;

import com.example.backend.services.customerService;
import jakarta.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.backend.models.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/api/orderSummary")
public class OrderSummaryController {

    @Autowired
    private customerService customerService;

    @GetMapping("/getorderSummary")
    public String showOrderSummary(HttpSession session, Model model) {
        OrderRequest selectedFood = (OrderRequest) session.getAttribute("selectedFood");
        if (selectedFood == null) {
            return "redirect:/search"; // Redirect to search page if no food item is selected
        }

        Long customerId = (Long) session.getAttribute("customerId");
        if (customerId != null) {
            customerModel customer = customerService.getCustomerById(customerId);
            if (customer != null) {
                model.addAttribute("defaultDeliveryLocation", customer.getCustAddress());
            }
        }
        System.out.println(selectedFood.getFood_name()+" "+selectedFood.getFood_price());
        // Add attributes to the model to pass data to the view
        model.addAttribute("foodName", selectedFood.getFood_name());
        model.addAttribute("foodPrice", selectedFood.getFood_price());
        model.addAttribute("foodCategory", selectedFood.getFood_cateogry());
        model.addAttribute("vegNonveg", selectedFood.isFood_veg());
        return "orderSummary"; // name of the HTML view
    }
}
