package com.example.backend.repositories;

import com.example.backend.models.OrderDetails;
import com.example.backend.models.OrderDisplayDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface orderDetailRepository extends CrudRepository<OrderDetails,Long> {
    @Query(value = "SELECT o.order_id, r.rest_name, o.order_total, od.food_id, i.food_name, od.quantity, od.suggestion " +
            "FROM order_details od " +
            "JOIN orders o ON od.order_id = o.order_id " +
            "JOIN item i ON od.food_id = i.food_id " +
            "JOIN restaurant r ON o.rest_id = r.rest_id " +
            "WHERE o.cust_id = :custId " +
            "ORDER BY o.order_id DESC", nativeQuery = true)
    List<Object[]> findOrdersByCustomerId(@Param("custId") Long custId);

    @Query(value = "SELECT o.order_id, r.rest_name, o.order_total, od.food_id, i.food_name, od.quantity, od.suggestion " +
            "FROM order_details od " +
            "JOIN orders o ON od.order_id = o.order_id " +
            "JOIN item i ON od.food_id = i.food_id " +
            "JOIN restaurant r ON o.rest_id = r.rest_id " +
            "WHERE o.delivery_id = :dpId " +
            "ORDER BY o.order_id DESC", nativeQuery = true)
    List<Object[]> findOrdersByDeliveryPartnerId(@Param("dpId") Long dpId);

    @Query(value = """
        SELECT 
            o.order_id, 
            r.rest_name, 
            o.order_total, 
            od.food_id, 
            i.food_name, 
            od.quantity, 
            od.suggestion 
        FROM order_details od 
        JOIN orders o ON od.order_id = o.order_id 
        JOIN item i ON od.food_id = i.food_id 
        JOIN restaurant r ON o.rest_id = r.rest_id 
        WHERE o.rest_id = :restId 
        ORDER BY o.order_id DESC
    """, nativeQuery = true)
    List<Object[]> findOrdersByRestaurantId(@Param("restId") Long restId);

}
