package com.example.backend.repositories;

import com.example.backend.models.restaurantModel;
import com.example.backend.models.restaurantmenuModel;

import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface restaurantRepository extends CrudRepository<restaurantModel, Long> {
    restaurantModel findByRestMail(String restMail);
    restaurantModel findByRestMailAndRestPswd(String restMail, String restPswd);

    @Query("SELECT r.restName FROM restaurantModel r WHERE r.restId = :restId")
    String findRestaurantNameByRestId(@Param("restId") Long restId);

    @Query("SELECT r.restName FROM restaurantModel r WHERE r.restId = (SELECT m.restId FROM restaurantmenuModel m WHERE m.menuNumber = :menuNumber)")
    String findRestaurantNameByMenuNumber(@Param("menuNumber") Long menuNumber);

    restaurantModel findByRestId(Long restId);

    Optional<restaurantModel> findByRestName(String restName);

   

}
