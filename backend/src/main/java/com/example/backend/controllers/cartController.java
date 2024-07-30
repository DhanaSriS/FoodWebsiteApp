package com.example.backend.controllers;
import com.example.backend.models.*;
import com.example.backend.repositories.restaurantmenuRepository;
import com.example.backend.services.CartService;
import com.example.backend.repositories.restaurantRepository;
import com.example.backend.repositories.itemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class cartController {
    private final CartService cartService;

    @Autowired
    public cartController(CartService cartService) {
        this.cartService = cartService;
    }


    @Autowired
    private itemRepository item_repo;

    @Autowired
    private restaurantmenuRepository restaurantmenu;

    @Autowired
    private restaurantRepository restaurant_repo;

    @PostMapping("/add")
    public ResponseEntity<?> addItemToCart(@RequestParam String restName,
                                           @RequestParam String foodName,
                                           @RequestParam int quantity,
                                           HttpSession session) {
        // Find restaurant by name
        restaurantModel rest = restaurant_repo.findByRestName(restName).orElse(null);
        if (rest == null) {
            return ResponseEntity.badRequest().body("Restaurant not found");
        }

        // Find item by name
        itemModel item = item_repo.findByfoodName(foodName).orElse(null);
        if (item == null) {
            return ResponseEntity.badRequest().body("Food item not found");
        }

        // Get the price from restaurant menu
        double price = restaurantmenu.findPrice(item.getFoodId(), rest.getRestId());

        // Retrieve cart from session or create new if not present
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart == null || !cart.getRestaurantId().equals(rest.getRestId())) {
            // Create a new cart for a different restaurant
            cart = new Cart(rest.getRestId(), rest.getRestName());
            session.setAttribute("cart", cart);
        }

        // Add item to cart
        CartItem cartItem = new CartItem(item.getFoodId(), item.getFoodName(), quantity, price);
        cart.addItem(cartItem);

        return ResponseEntity.ok("Item added to cart");
    }

    @DeleteMapping("/remove")
    public String removeItemFromCart(@RequestParam Long foodId, HttpSession session) {
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart != null) {
            cartService.removeItemFromCart(cart, foodId);
            return "Item removed from cart.";
        }
        return "Cart is empty.";
    }

    @GetMapping("/total")
    public double getCartTotal(HttpSession session) {
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart != null) {
            return cartService.calculateCartTotal(cart);
        }
        return 0.0;
    }

    // @PostMapping("/confirm")
    // public String confirmOrder(HttpSession session) {
    //     Cart cart = (Cart) session.getAttribute("cart");
    //     if (cart != null && !cart.getItems().isEmpty()) {
    //         // Logic to confirm the order, like saving it to the database
    //         cartService.clearCart(cart); // Clear the cart after order confirmation
    //         session.removeAttribute("cart"); // Clear cart from session
    //         return "Order confirmed.";
    //     }
    //     return "Cart is empty. Cannot confirm order.";
    // }

    // private Cart getCart(HttpSession session, Long restaurantId, String restaurantName) {
    //     Cart cart = (Cart) session.getAttribute("cart");
    //     if (cart == null || !cart.getRestaurantId().equals(restaurantId)) {
    //         // If there's no cart or the cart belongs to a different restaurant, create a new one
    //         cart = cartService.createOrGetCart(restaurantId, restaurantName);
    //     }
    //     return cart;
    // }

    @GetMapping("/show")
    public ResponseEntity<?> showCart(HttpSession session) {
        // Retrieve cart from session
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart == null || cart.getItems().isEmpty()) {
            return ResponseEntity.ok("Cart is empty");
        }

        // Prepare cart details
        CartDetailsResponse response = new CartDetailsResponse();
        response.setRestaurantName(cart.getRestaurantName());
        response.setItems(cart.getItems());
        response.setTotalPrice(cart.calculateTotal());

        return ResponseEntity.ok(response);
    }

    // Inner class for response format
    public static class CartDetailsResponse {
        private String restaurantName;
        private List<CartItem> items;
        private double totalPrice;

        // Getters and setters...

        public String getRestaurantName() {
            return restaurantName;
        }

        public void setRestaurantName(String restaurantName) {
            this.restaurantName = restaurantName;
        }

        public List<CartItem> getItems() {
            return items;
        }

        public void setItems(List<CartItem> items) {
            this.items = items;
        }

        public double getTotalPrice() {
            return totalPrice;
        }

        public void setTotalPrice(double totalPrice) {
            this.totalPrice = totalPrice;
        }
    }
}
