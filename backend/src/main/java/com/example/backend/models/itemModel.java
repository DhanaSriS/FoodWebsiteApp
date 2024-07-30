package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@Entity
@Table(name = "Item")
public class itemModel {
    // Getters and setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="food_id")
    private Long foodId;

    @Column(name = "food_name", nullable = false, unique = true)
    private String foodName;

    @Column(name = "food_category", nullable = false)
    private String foodCategory;

    @Column(name = "veg_nonveg", nullable = false)
    private boolean vegNonveg;

    public itemModel(Long foodId, String foodName, String foodCategory, boolean vegNonveg) {
        this.foodId = foodId;
        this.foodName = foodName;
        this.foodCategory = foodCategory;
        this.vegNonveg = vegNonveg;
    }

    public itemModel() {
    }
}
