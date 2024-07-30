package com.example.backend.controllers;

import com.example.backend.models.itemModel;
import com.example.backend.models.restaurantmenuModel;
import com.example.backend.services.restaurantmenuService;
import jakarta.servlet.http.HttpSession;

import java.sql.Time;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.services.itemService;

@RestController
@RequestMapping("/api/menu")
public class restaurantMenuController {

    @Autowired
    private restaurantmenuService menuService;


    @Autowired
    private itemService itemService;

    @PostMapping("/addmenu")
    public ResponseEntity<String> addMenu(@RequestParam String foodname,
                                          @RequestParam int preptime,
                                          @RequestParam double price,
                                          HttpSession session) {
        // Retrieve restaurant ID from session
        Long restId = (Long) session.getAttribute("restId");
        if (restId == null) {
            return ResponseEntity.status(401).body("Restaurant not logged in.");
        }

        // Call service method to add menu item
        boolean added = menuService.addMenuItem(foodname, preptime, price, restId);

        if (added) {
            return ResponseEntity.ok("Menu item added successfully.");
        } else {
            return ResponseEntity.status(500).body("Failed to add menu item.");
        }
    }

    @PostMapping("/addnewmenu")
    public Map<String, Object> addNewMenu(
            @RequestParam String foodname,
            @RequestParam int preptime,
            @RequestParam double price,
            @RequestParam String category,
            @RequestParam boolean veg_noveg,
            HttpSession session
    ) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Insert into item table
            itemModel newItem = new itemModel();
            newItem.setFoodName(foodname);
            newItem.setFoodCategory(category);
            newItem.setVegNonveg(veg_noveg ? true : false);
            itemModel savedItem = itemService.saveItem(newItem);

            Long restId = (Long) session.getAttribute("restId");
            restaurantmenuModel newMenu = new restaurantmenuModel();
            newMenu.setFoodId(savedItem.getFoodId());
            newMenu.setPreparationTime(Time.valueOf(String.format("%02d:00:00", preptime)));
            newMenu.setFoodPrice(price);
            newMenu.setRestId(restId);
            menuService.addnewMenuItem(newMenu);
            response.put("success", true);
            response.put("message", "Menu item added successfully.");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to add menu item: " + e.getMessage());
        }

        return response;
    }


    @PatchMapping("/available")
    public ResponseEntity<?> updateAvailability(@RequestParam Long itemId,@RequestParam Long restId, @RequestParam boolean available) {
        try {
            menuService.setAvailability(itemId, restId,available);
            return ResponseEntity.ok("Item availability updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update item availability");
        }
    }
}
