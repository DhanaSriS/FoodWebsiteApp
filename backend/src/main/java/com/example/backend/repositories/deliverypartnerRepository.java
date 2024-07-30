package com.example.backend.repositories;

import com.example.backend.models.deliverypartnerModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface deliverypartnerRepository extends CrudRepository<deliverypartnerModel,Long> {
    deliverypartnerModel findByDpMail(String dpMail);
    deliverypartnerModel findByDpMailAndDpPswd(String mail,String pswd);
    @Query(value = "SELECT * FROM Delivery_partner WHERE dp_available = true LIMIT 1", nativeQuery = true)
    deliverypartnerModel findFirstByDpavailable(@Param("available") boolean available);
}
