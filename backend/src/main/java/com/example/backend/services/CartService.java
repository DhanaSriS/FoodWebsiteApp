package com.example.backend.services;
import com.example.backend.models.Cart;
import com.example.backend.models.CartItem;

import com.example.backend.models.itemModel;
import com.example.backend.repositories.itemRepository;
import com.example.backend.repositories.restaurantmenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;

@Service
public class CartService {

    private final itemRepository itemRepository;
    private final restaurantmenuRepository restaurantMenuRepository;

    @Autowired
    public CartService(itemRepository itemRepository, restaurantmenuRepository restaurantMenuRepository) {
        this.itemRepository = itemRepository;
        this.restaurantMenuRepository = restaurantMenuRepository;
    }

    public Cart createOrGetCart(Long restaurantId, String restaurantName) {
        // Create a new cart or retrieve an existing one
        return new Cart(restaurantId, restaurantName);
    }

    public void addItemToCart(Cart cart, Long foodId, int quantity) {
        Optional<itemModel> optionalItem = itemRepository.findById(foodId);
        if (optionalItem.isPresent()) {
            itemModel item = optionalItem.get();
            double price = getFoodPrice(foodId);
            CartItem cartItem = new CartItem(foodId, item.getFoodName(), quantity, price);
            cart.addItem(cartItem);
        } else {
            throw new IllegalArgumentException("Item not found for id: " + foodId);
        }
    }

    public void removeItemFromCart(Cart cart, Long foodId) {
        cart.removeItem(foodId);
    }

    public double calculateCartTotal(Cart cart) {
        return cart.calculateTotal();
    }

    public void clearCart(Cart cart) {
        cart.clear();
    }

    private double getFoodPrice(Long foodId) {
        return restaurantMenuRepository.findByfoodId(foodId).getFoodPrice();
    }
}
