package com.example.backend.controllers;

import com.example.backend.models.LoginRequest;
import com.example.backend.models.OrderDisplayDTO;
import com.example.backend.models.orderModel;

import jakarta.servlet.http.HttpSession;
import com.example.backend.models.restaurantModel;
import com.example.backend.models.restaurantmenuModel;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.backend.repositories.restaurantRepository;
import com.example.backend.services.restaurantService;
import com.example.backend.services.restaurantmenuService;

import java.sql.Time;
import java.util.List;



@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:5173/", allowCredentials = "true")
public class restaurantController {
    @Autowired
    private restaurantService restaurant_Service;
    
    @Autowired
    private restaurantRepository restaurantRepository;

    @Autowired
    private restaurantmenuService restaurantmenu_Service;

    @PostMapping("/addRestaurant")
    public restaurantModel addCustomer(@RequestBody restaurantModel restaurant) {
        return restaurant_Service.saveRestaurant(restaurant);
    }

    @GetMapping("/getAllRestaurants")
    public List<restaurantModel> getAllRestaurant() {
        return restaurant_Service.getAllRestaurants();
    }

    @GetMapping("get")
    // public restaurantModel getRestaurantById(@PathVariable Long id) {
    //     return restaurant_Service.getRestaurantById(id);
    // }
    public restaurantModel getRestaurantById(HttpSession httpSession) {
        return restaurant_Service.getRestaurantById((long)httpSession.getAttribute("restId"));
    }

    @PutMapping("updateRestaurant/{id}")
    public restaurantModel updateRestaurant(@PathVariable Long id, @RequestBody restaurantModel restaurant) {
        restaurant.setRestId(id);
        return restaurant_Service.updateRestaurant(restaurant);
    }

    @GetMapping("findRestName")
public ResponseEntity<String> findRestName(@RequestParam Long restId) {
    restaurantModel restaurant = restaurant_Service.getRestaurantById(restId);
    
    if (restaurant != null) {
        return ResponseEntity.ok(restaurant.getRestName());
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body("Restaurant not found");
    }
}

    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
    @DeleteMapping("deleteRestaurant/{id}")
    public void deleteRestaurant(@PathVariable Long id) {
        restaurant_Service.deleteRestaurant(id);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password, HttpSession session) {
        restaurantModel restaurant = restaurantRepository.findByRestMail(email);
        if (restaurant != null) {
            session.setAttribute("restId", restaurant.getRestId());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/findOrders")
    public ResponseEntity<List<OrderDisplayDTO>> findRestaurantOrders(HttpSession session) {
        Long restId = (Long) session.getAttribute("restId");
        if (restId == null) {
            return ResponseEntity.status(401).body(null); // Unauthorized if no restId in session
        }
        List<OrderDisplayDTO> orders = restaurant_Service.findRestaurantOrdersId(restId);
        return ResponseEntity.ok(orders);
    }
    @PostMapping("/shipped")
    public ResponseEntity<String> shipped(HttpSession session,@RequestParam Long order_id) {
        try {
            restaurant_Service.shipped(session,order_id);
            return ResponseEntity.ok("Delivery status updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/getmenu")

    public List<restaurantmenuModel> findmenu(HttpSession session) {

        long restId=(long)session.getAttribute("restId");

       

        return restaurantmenu_Service.findmenu(restId);

    }
}
