package com.example.backend.repositories;

import com.example.backend.models.orderModel;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
@Repository
public interface orderRepository extends CrudRepository<orderModel, Long> {
    List<orderModel> findByRestIdOrderByOrderIdDesc(Long restId);
    List<orderModel> findByDpidOrderByOrderIdDesc(Long dpId);

    List<orderModel> findByCustIdOrderByOrderIdDesc(Long custId);
}

