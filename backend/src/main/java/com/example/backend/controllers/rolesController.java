package com.example.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.rolesModel;
import com.example.backend.services.rolesService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/roles")
public class rolesController {
    
    @Autowired
    rolesService roles_Service;
    
    @GetMapping("/findrole")
    public int findRole(@RequestParam String email) {
        return roles_Service.findRole(email);
    }
    
}
