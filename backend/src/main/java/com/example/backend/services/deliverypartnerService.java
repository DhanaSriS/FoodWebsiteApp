package com.example.backend.services;

import com.example.backend.models.*;
import com.example.backend.repositories.orderDetailRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.backend.repositories.deliverypartnerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;

@Service
public class deliverypartnerService {


    @Autowired
    private orderDetailRepository order_detail;
    @Autowired
    private paymentService payment;
    @Autowired
    private deliverypartnerRepository deliverypartnerRepository;

    @Autowired
    orderService orderService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public deliverypartnerModel saveDeliveryPartner(deliverypartnerModel deliverypartner){
        deliverypartner.setDpPswd(passwordEncoder.encode(deliverypartner.getDpPswd()));
        return deliverypartnerRepository.save(deliverypartner);
    }

    public List<deliverypartnerModel> getAllDeliveryPartner(){
        return (List<deliverypartnerModel>) deliverypartnerRepository.findAll();
    }

    public void deleteDeliveryPartner(Long id) {
        deliverypartnerRepository.deleteById(id);
    }

    public boolean validateLogin(String email,String pass){
        deliverypartnerModel acc = deliverypartnerRepository.findByDpMail(email);
        return  passwordEncoder.matches(pass, acc.getDpPswd());
    }
    
    // private deliverypartnerModel findByDpMail(String email) {
    //     return deliverypartnerRepository.findByDpMail(email);
    // }

    public deliverypartnerModel updateDeliveryPartner(deliverypartnerModel deliverypartner) {
        return deliverypartnerRepository.save(deliverypartner);
    }



    public deliverypartnerModel getDPById(Long id) {
        Optional<deliverypartnerModel> customerOptional = deliverypartnerRepository.findById(id);
        return customerOptional.orElse(null);
    }

    public Long assignDeliveryPartner() {
        // Find the first available delivery partner
        deliverypartnerModel deliveryPartner = deliverypartnerRepository.findFirstByDpavailable(true);

        if (deliveryPartner == null) {
            throw new RuntimeException("No available delivery partners");
        }

        // Update delivery partner status to "busy"
          deliveryPartner.setDpavailable(false);
          deliverypartnerRepository.save(deliveryPartner);

        return deliveryPartner.getDeliveryId(); // Return the name or ID of the assigned partner
    }
    @Transactional
    public void delivered(HttpSession session, Long orderId) {
        Long dpId = (Long) session.getAttribute("deliveryId");

        if (dpId == null) {
            throw new RuntimeException("Delivery partner ID not found in session.");
        }

        deliverypartnerModel dp = deliverypartnerRepository.findById(dpId).orElse(null);

        if (dp == null) {
            throw new RuntimeException("Delivery partner not found with ID: " + dpId);
        }

        dp.setDpavailable(true); // Set the delivery partner as available
        deliverypartnerRepository.save(dp); // Save the updated delivery partner

        // Update the order status to "Delivered"
        orderService.updateOrderStatusAndTime(orderId, "Delivered", new Timestamp(System.currentTimeMillis()));

        payment.createPayment(orderId);
    }

    public List<OrderDisplayDTO> findDeliveryOrders(Long dpId) {
        // Modify this query to match orders assigned to the specific delivery partner
        List<Object[]> results = order_detail.findOrdersByDeliveryPartnerId(dpId);
        Map<Long, OrderDisplayDTO> ordersMap = new LinkedHashMap<>();

        for (Object[] result : results) {
            Long orderId = ((Number) result[0]).longValue();
            String restName = (String) result[1];
            double orderTotal = ((Number) result[2]).doubleValue();
            String foodName = (String) result[4];
            int quantity = ((Number) result[5]).intValue();
            String suggestion = (String) result[6];

            OrderItemDTO item = new OrderItemDTO(foodName, quantity, suggestion);

            // Add items to corresponding orders, grouped by orderId
            if (!ordersMap.containsKey(orderId)) {
                List<OrderItemDTO> items = new ArrayList<>();
                items.add(item);
                OrderDisplayDTO orderDisplay = new OrderDisplayDTO(orderId, restName, orderTotal, items);
                ordersMap.put(orderId, orderDisplay);
            } else {
                OrderDisplayDTO existingOrder = ordersMap.get(orderId);
                existingOrder.getItems().add(item);
            }
        }

        // Convert the map values to a list for the final result
        return new ArrayList<>(ordersMap.values());
    }

//        @Autowired
//        private GeocodingService geocodingService;
//
//        public String assignDeliveryPartner(String restAddress) throws Exception {
//            double[] restLatLong = geocodingService.getLatLong(restAddress);
//            double restLat = restLatLong[0];
//            double restLong = restLatLong[1];
//
//            List<deliverypartnerModel> availablePartners = deliverypartnerRepository.findAllByDpavailable(true);
//            deliverypartnerModel nearestPartner = null;
//            double minDistance = Double.MAX_VALUE;
//
//            for (deliverypartnerModel partner : availablePartners) {
//                double[] partnerLatLong = geocodingService.getLatLong(partner.getCurrentLocation());
//                double distance = calculateDistance(restLat, restLong, partnerLatLong[0], partnerLatLong[1]);
//                if (distance < minDistance) {
//                    minDistance = distance;
//                    nearestPartner = partner;
//                }
//            }
//
//            if (nearestPartner != null) {
//                nearestPartner.setDpavailable(false);
//                deliverypartnerRepository.save(nearestPartner);
//                return nearestPartner.getDeliveryName();
//            } else {
//                throw new RuntimeException("No available delivery partners found");
//            }
//        }
//
//        private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
//            final int R = 6371; // Radius of the earth in km
//            double latDistance = Math.toRadians(lat2 - lat1);
//            double lonDistance = Math.toRadians(lon2 - lon1);
//            double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
//                    + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
//                    * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
//            double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//            double distance = R * c; // convert to kilometers
//            return distance;
//        }

//    public List<orderModel> findDeliveryOrders(Long dp_id){
//        return orderService.getOrdersByDeliveryId(dp_id);
//    }

}
