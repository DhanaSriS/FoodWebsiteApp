package com.example.backend.controllers;


import com.example.backend.models.*;
import com.example.backend.repositories.itemRepository;
import com.example.backend.repositories.restaurantRepository;
import com.example.backend.repositories.restaurantmenuRepository;
import com.example.backend.services.deliverypartnerService;
import com.example.backend.services.orderService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.backend.services.customerService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class orderController {

    @Autowired
    private orderService OrderService;

    @Autowired
    private orderService orderService;

    @Autowired
    restaurantRepository restaurant_repo;
    @Autowired
    private deliverypartnerService deliveryPartnerService; // Service for delivery partner assignment

    @Autowired
    private customerService customerService;

    @Autowired
    restaurantmenuRepository restaurantmenu;

    @Autowired
    itemRepository item_repo;

//    @PostMapping("/confirmOrder")
//    public ResponseEntity<?> confirmOrder(@RequestParam int quantity,
//                                          @RequestParam(required = false) String suggestion,
//                                          @RequestParam String restname,
//                                          @RequestParam String foodname,
//                                          HttpSession session) {
//        //OrderRequest selectedFood = (OrderRequest) session.getAttribute("selectedFood");
//        // if (selectedFood == null) {
//        //     return ResponseEntity.badRequest().body("No food item selected");
//        // }
//
//        // Get the customer ID from the session
//        Long customerId = (Long) session.getAttribute("custId");
//        if (customerId == null) {
//            return ResponseEntity.badRequest().body("Customer not logged in");
//        }
//
//        // Retrieve default delivery location
//        String deliveryLocation = customerService.getCustomerById(customerId).getCustAddress();
//
//        // Retrieve the food item by food name
//        itemModel item = item_repo.findByfoodName(foodname).orElse(null);
//        if (item == null) {
//            return ResponseEntity.badRequest().body("Food item not found");
//        }
//
//        restaurantModel rest = restaurant_repo.findByRestName(restname).orElse(null);
//
//        double price = restaurantmenu.findPrice( item.getFoodId(),rest.getRestId());
//
//        // Create an OrderModel
//        orderModel order = new orderModel();
//        order.setFoodId(item.getFoodId());
//        order.setQuantity(quantity);
//        order.setRestId(rest.getRestId());
//        order.setSuggestion(suggestion);
//        order.setOrder_total(price * quantity); // Calculate total price
//        order.setDeliveryLocation(deliveryLocation); // Set delivery location
//        order.setCustId(customerId); // Set customer ID
//
//        // Assign a delivery partner
//        Long deliveryPartner = deliveryPartnerService.assignDeliveryPartner();
//        order.setDpid(deliveryPartner);
//        order.setOrderStatus("Order assigned");
//
//        // Save the order
//        orderService.saveOrder(order);
//        // Clear the selected food from the session
//        session.removeAttribute("selectedFood");
//
//        return ResponseEntity.ok("Order confirmed");
//    }
//@PostMapping("/confirm")
//public ResponseEntity<?> confirmOrder(@RequestParam(required = false) String suggestion,
//                                      HttpSession session) {
//
//    // Retrieve cart from session
//    Cart cart = (Cart) session.getAttribute("cart");
//    if (cart == null || cart.getItems().isEmpty()) {
//        return ResponseEntity.badRequest().body("Cart is empty");
//    }
//
//    // Get the customer ID from the session
//    Long customerId = (Long) session.getAttribute("custId");
//    if (customerId == null) {
//        return ResponseEntity.badRequest().body("Customer not logged in");
//    }
//
//    // Retrieve default delivery location
//    String deliveryLocation = customerService.getCustomerById(customerId).getCustAddress();
//
//    // Process each item in the cart
//    for (CartItem item : cart.getItems()) {
//        // Create an OrderModel
//        orderModel order = new orderModel();
//        //order.setFoodId(item.getFoodId());
//        //order.setQuantity(item.getQuantity());
//        order.setRestId(cart.getRestaurantId());
//        //order.setSuggestion(suggestion);
//        order.setOrder_total(item.getTotalPrice()); // Set item total price
//        order.setDeliveryLocation(deliveryLocation); // Set delivery location
//        order.setCustId(customerId); // Set customer ID
//
//        // Assign a delivery partner
//        Long deliveryPartner = deliveryPartnerService.assignDeliveryPartner();
//        order.setDpid(deliveryPartner);
//        order.setOrderStatus("Order assigned");
//
//        // Save the order
//        orderService.saveOrder(order);
//    }
//
//    // Clear the cart after confirming order
//    cart.clear();
//    session.setAttribute("cart", cart);
//
//    return ResponseEntity.ok("Order confirmed");
//}

    @PostMapping("/confirmOrder")
    public ResponseEntity<?> confirmOrder(HttpSession session) {
        // Get the customer ID from the session
        Long customerId = (Long) session.getAttribute("custId");
        if (customerId == null) {
            return ResponseEntity.badRequest().body("Customer not logged in");
        }

        // Retrieve the cart from the session
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart == null) {
            return ResponseEntity.badRequest().body("Cart is empty");
        }

        // Retrieve default delivery location
        String deliveryLocation = customerService.getCustomerById(customerId).getCustAddress();

        double totalOrderPrice = 0.0;

        // Create and save an OrderModel
        orderModel order = new orderModel();
        order.setCustId(customerId);
        order.setDeliveryLocation(deliveryLocation);

        // Assign a delivery partner
        Long deliveryPartner = deliveryPartnerService.assignDeliveryPartner();
        order.setDpid(deliveryPartner);
        order.setOrderStatus("Order assigned");

        // Save the order


        restaurantModel rest = restaurant_repo.findByRestName(cart.getRestaurantName()).orElse(null);
        if (rest == null) {
            return ResponseEntity.badRequest().body("Restaurant not found: " + cart.getRestaurantName());
        }
        order.setRestId(rest.getRestId());
        orderModel savedOrder = orderService.saveOrder(order);
        // Process each item in the cart
        for (CartItem cartItem : cart.getItems()) {
            String foodname = cartItem.getFoodName();
            int quantity = cartItem.getQuantity();
            double price = cartItem.getPrice();

            // Retrieve the food item by food name
            itemModel item = item_repo.findByfoodName(foodname).orElse(null);
            if (item == null) {
                return ResponseEntity.badRequest().body("Food item not found: " + foodname);
            }

            // Retrieve the restaurant by name


            double itemTotalPrice = price * quantity;
            totalOrderPrice += itemTotalPrice;

            // Save order details
            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setOrder_id(savedOrder.getOrderId());
            orderDetail.setFood_id(item.getFoodId());
            orderDetail.setQuantity(quantity);
            orderService.saveOrderDetail(orderDetail);
        }

        // Update total order price
        savedOrder.setOrder_total(totalOrderPrice);
        orderService.saveOrder(savedOrder);

        // Clear the cart from session
        session.removeAttribute("cart");

        return ResponseEntity.ok("Order confirmed and details saved");
    }

}









