package com.example.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.rolesModel;
import java.util.List;


@Repository
public interface rolesRepository extends CrudRepository<rolesModel,String> {
    rolesModel findByemail(String email);
}
