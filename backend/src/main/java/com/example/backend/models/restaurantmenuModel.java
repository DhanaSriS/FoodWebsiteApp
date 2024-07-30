package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Data
@Entity
@Getter
@Setter
@Table(name = "restaurant_menu")
public class restaurantmenuModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="menu_no")
    private Long menuNumber;

    @Column(name = "food_id")
    private long foodId;

    @Column(name = "rest_id")
    private long restId;

    @Column(name = "food_price")
    private double foodPrice;

    @Column(name = "preparation_time")
    private Time preparationTime;

    @Column(name="m_available")
    private boolean mAvailable;

}
