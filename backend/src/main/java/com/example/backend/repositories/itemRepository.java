package com.example.backend.repositories;

import java.util.*;
import com.example.backend.models.itemModel;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface itemRepository extends CrudRepository<itemModel, Long> {

    Optional<itemModel> findByfoodName(String foodName);
    //Long  findByFoodName(String foodName);

    itemModel findByfoodId(Long foodid);
   

    // Method to find all iems with names containing the search query (case-insensitive)
    @Query(value="SELECT i.food_name FROM item i WHERE LOWER(i.food_name) LIKE LOWER(CONCAT('%', :foodName, '%'))",nativeQuery=true)
    List<itemModel> findByPartialFoodName(String foodName);
}
