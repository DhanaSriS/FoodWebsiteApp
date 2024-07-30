package com.example.backend.controllers;

import com.example.backend.models.*;
import com.example.backend.repositories.customerRepository;
import com.example.backend.repositories.deliverypartnerRepository;
import com.example.backend.services.SearchService;
import com.example.backend.services.orderService;
import com.example.backend.services.customerService;

import com.example.backend.services.restaurantmenuService;

import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173/",allowCredentials = "true")
public class customerController {
    @Autowired
    private customerService customerService;
    @Autowired
    private restaurantmenuService restaurantmenuService;
    @Autowired
    private customerRepository customer_repo;
    @Autowired
    private SearchService searchService;
    @Autowired
    private orderService orderService;
    @PostMapping("/addCustomer")
    public customerModel addCustomer(@RequestBody customerModel customer) {
        return customerService.saveCustomer(customer);
    }
    @GetMapping("/getAll")
    public List<customerModel> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/get")
    public customerModel getCustomerById(HttpSession httpSession) {
        return customerService.getCustomerById((long)httpSession.getAttribute("custId"));
    }
    

    @PutMapping("/update/{id}")
    public customerModel updateCustomer(@PathVariable Long id, @RequestBody customerModel customer) {
        customer.setCustId(id);
        return customerService.updateCustomer(customer);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password, HttpSession session) {
        customerModel dp = customer_repo.findByCustMail(email);
        if (dp != null && customerService.validateLogin(email, password)) {
            session.setAttribute("custId", dp.getCustId());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

    @GetMapping("/searchbyname")
    public ResponseEntity<?> searchByName(@RequestParam String foodName) {
        List<Map<String, Object>> restaurantDetails = restaurantmenuService.searchRestaurantByFoodName(foodName);
        if (restaurantDetails == null || restaurantDetails.isEmpty()) {
            return ResponseEntity.badRequest().body("No food items found with the given name");
        }
        return ResponseEntity.ok(restaurantDetails);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String name) {
        List<Map<String, Object>> restaurantDetails = restaurantmenuService.search(name);
        if (restaurantDetails == null || restaurantDetails.isEmpty()) {
            return ResponseEntity.badRequest().body("No food items found with the given name");
        }
        return ResponseEntity.ok(restaurantDetails);
    }
    

//    @GetMapping("/findOrders")
//    public ResponseEntity<List<orderModel>> findCustomerOrders(HttpSession session) {
//        Long custId = (Long) session.getAttribute("custId");
//        if (custId == null) {
//            return ResponseEntity.status(401).body(null); // Unauthorized if no restId in session
//        }
//        List<orderModel> orders = customerService.findCustomerOrders(custId);
//        return ResponseEntity.ok(orders);
//    }
@GetMapping("/findOrders")
public ResponseEntity<List<OrderDisplayDTO>> findCustomerOrders(HttpSession session) {
    Long custId = (Long) session.getAttribute("custId");
    if (custId == null) {
        return ResponseEntity.status(401).body(null); // Unauthorized if no custId in session
    }
    List<OrderDisplayDTO> orders = orderService.findCustomerOrders(custId);
    return ResponseEntity.ok(orders);
}
}

