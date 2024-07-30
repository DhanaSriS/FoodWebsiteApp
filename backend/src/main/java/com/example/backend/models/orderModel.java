package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "Orders")
public class orderModel {
    @Id
    @Column(name="order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "rest_id", nullable = false)
    private Long restId;

    @Column(name = "cust_id", nullable = false)
    private Long custId;

    @Column(name = "order_status", nullable = false)
    private String orderStatus;


    @Column(name = "delivery_location")
    private String deliveryLocation;

    @Column(name = "delivery_time")
    private Timestamp deliveryTime;


    @Column(name="delivery_id")
    private Long dpid;

    @Column(name="order_total")
    private double order_total;


}
