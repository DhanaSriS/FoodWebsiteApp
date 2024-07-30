package com.example.backend.repositories;

import java.util.*;

import com.example.backend.models.itemModel;
import com.example.backend.models.restaurantmenuModel;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

@Repository
public interface restaurantmenuRepository extends CrudRepository<restaurantmenuModel,Long> {

    @Query("SELECT i.foodId FROM itemModel i WHERE i.foodName = :foodName")
    //@Query(value="Select * from restaurant_menu where LOWER(foodName) LIKE LOWER(CONCAT('%', :foodName, '%'))",nativeQuery=true)
    Long findFoodIdByName(@Param("foodName")String foodName);

    @Query("SELECT rm.restId FROM restaurantmenuModel rm WHERE rm.foodId = :foodId")
    List<Long> findRestNumbersByFoodId(Long foodId);

    restaurantmenuModel findByfoodId(Long foodId);
    
    List<restaurantmenuModel> findByFoodId(Long foodId);

    List<restaurantmenuModel> findByRestId(Long restId);

    @Query(value="SELECT food_price from restaurant_menu where food_id = :foodId AND rest_id = :restId", nativeQuery = true)
    double findPrice(@Param("foodId") Long foodId, @Param("restId") Long restId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE restaurant_menu SET m_available = :available WHERE food_id = :foodId AND rest_id = :restId", nativeQuery = true)
    void updateAvailability(@Param("foodId") Long foodId, @Param("restId") Long restId, @Param("available") boolean available);

 

}
