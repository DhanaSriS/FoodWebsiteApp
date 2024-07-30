package com.example.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.itemModel;
import com.example.backend.services.itemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/items")
public class itemController {
    @Autowired
    itemService item_Service;

    @GetMapping("/selectAllFoods")
    public Iterable<itemModel> getMethodName() {
        return item_Service.selectAll();
    }
    
    @GetMapping("/findFoodName")
    public String findFoodName(@RequestParam long foodId){
        return item_Service.findById(foodId);
    }
}
