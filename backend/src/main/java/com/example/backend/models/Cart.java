package com.example.backend.models;

import java.util.ArrayList;
import java.util.List;
public class Cart {
    private Long restaurantId;
    private String restaurantName;
    private List<CartItem> items;

    public Cart(Long restaurantId, String restaurantName) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.items = new ArrayList<>();
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void addItem(CartItem item) {
        for (CartItem cartItem : items) {
            if (cartItem.getFoodId().equals(item.getFoodId())) {
                cartItem.setQuantity(cartItem.getQuantity() + item.getQuantity());
                return;
            }
        }
        items.add(item);
    }

    public void removeItem(Long foodId) {
        items.removeIf(item -> item.getFoodId().equals(foodId));
    }

    public double calculateTotal() {
        return items.stream().mapToDouble(CartItem::getTotalPrice).sum();
    }
    public void clear() {
        items.clear();
    }
}
