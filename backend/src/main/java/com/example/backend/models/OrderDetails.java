package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
@Table(name="order_details")
public class OrderDetails {

    @Id
    @Column(name="order_detail_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_detail_Id;

    @Column(name = "order_id")
    private Long order_id;

    @Column(name = "food_id")
    private Long food_id;

    @Column(name="quantity")
    private int quantity;

    @Column(name = "suggestion")
    private String suggestion;
    
}


