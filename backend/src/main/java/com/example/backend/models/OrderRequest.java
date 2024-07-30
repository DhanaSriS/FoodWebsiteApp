package com.example.backend.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    private String food_name;
    private float food_price;
    private String food_cateogry;
    private String rest_name;
    private boolean food_veg;
}
