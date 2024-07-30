package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.models.rolesModel;
import com.example.backend.repositories.rolesRepository;

@Service
public class rolesService {

    @Autowired
    rolesRepository roles_Repository;

    public int findRole(String email){
        rolesModel acc= roles_Repository.findByemail(email);
        return acc.getUserrole();
    }
}   