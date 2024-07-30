package com.example.backend.repositories;

import com.example.backend.models.paymentModel;
import org.springframework.data.repository.CrudRepository;

public interface paymentRepository extends CrudRepository<paymentModel,Integer> {
}
