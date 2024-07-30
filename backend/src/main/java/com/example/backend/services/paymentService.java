package com.example.backend.services;

import com.example.backend.models.paymentModel;
import com.example.backend.repositories.paymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class paymentService {
    @Autowired
    paymentRepository payment_Repository;


    @Transactional
    public void createPayment(Long orderId) {
        paymentModel payment = new paymentModel();
        payment.setOrderId(orderId);
        payment.setPaymentMode("COD"); // Cash on Delivery
        payment.setPaymentStatus("Delivered"); // Or another status as needed

        payment_Repository.save(payment);
    }
}

