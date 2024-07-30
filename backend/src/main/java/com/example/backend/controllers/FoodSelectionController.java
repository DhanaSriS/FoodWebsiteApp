package com.example.backend.controllers;
import com.example.backend.models.OrderRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class FoodSelectionController {
    @PostMapping("/selectFood")
    public ResponseEntity<?> selectFood(@RequestBody OrderRequest selectedFood, HttpSession session) {

        session.setAttribute("selectedFood", selectedFood);
        return ResponseEntity.ok("Food item selected");
    }
}
