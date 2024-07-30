
package com.example.backend.controllers;

import com.example.backend.models.*;
import com.example.backend.repositories.deliverypartnerRepository;
import com.example.backend.repositories.orderDetailRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.services.deliverypartnerService;


import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/delivery_partner")
public class deliveryPartnerController {

    @Autowired
    private deliverypartnerService dpService;

    @Autowired
    private deliverypartnerRepository deliverypartner_Repository;

    @Autowired
    private orderDetailRepository order_detail;
    @PostMapping("/addDP")
    public deliverypartnerModel addDP(@RequestBody deliverypartnerModel dp) {
        return dpService.saveDeliveryPartner(dp);
    }

    @GetMapping("/findOrders")
    public ResponseEntity<List<OrderDisplayDTO>> findDeliveryOrders(HttpSession session) {
        Long dpId = (Long) session.getAttribute("deliveryId");
        if (dpId == null) {
            return ResponseEntity.status(401).body(null); // Unauthorized if no deliveryId in session
        }
        List<OrderDisplayDTO> orders = dpService.findDeliveryOrders(dpId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/getAllDP")
    public List<deliverypartnerModel> getAllDP() {
        return dpService.getAllDeliveryPartner();
    }

    @GetMapping("get")
    public deliverypartnerModel getDPById(HttpSession httpSession) {
        return dpService.getDPById((long)httpSession.getAttribute("deliveryId"));
    }    
    
    

    @PutMapping("update/{id}")
    public deliverypartnerModel updateDP(@PathVariable Long id, @RequestBody deliverypartnerModel dp) {
        dp.setDeliveryId(id);
        return dpService.updateDeliveryPartner(dp);
    }

    @DeleteMapping("delete/{id}")
    public void deleteDP(@PathVariable Long id) {
        dpService.deleteDeliveryPartner(id);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password, HttpSession session) {
        deliverypartnerModel dp = deliverypartner_Repository.findByDpMail(email);
        if (dp != null && dpService.validateLogin(email, password)) {
            session.setAttribute("deliveryId", dp.getDeliveryId());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout successful");
    }

//    @GetMapping("/findOrders")
//    public  ResponseEntity<List<orderModel>> findDeliveryOrders(HttpSession session) {
//        Long dpId = (Long) session.getAttribute("deliveryId");
//        if (dpId == null) {
//            return ResponseEntity.status(401).body(null);
//        }
//        List<orderModel> orders = dpService.findDeliveryOrders(dpId);
//        return ResponseEntity.ok(orders);
//    }



    @PostMapping("/delivered")
    public ResponseEntity<String> delivered(HttpSession session,@RequestParam Long order_id) {
        try {
            dpService.delivered(session,order_id);
            return ResponseEntity.ok("Delivery status updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    // @GetMapping("/findOrders")
    // public long findDeliveryOrders(HttpSession session) {
    //     Long dpId = (Long) session.getAttribute("deliveryId");
    //     return dpId;
    //     // if (dpId == null) {
    //     //     return ResponseEntity.status(401).body(null); 
    //     // }
    //     //List<orderModel> orders = dpService.findDeliveryOrders(dpId);
    //     //return ResponseEntity.ok(orders);
    // }


}
