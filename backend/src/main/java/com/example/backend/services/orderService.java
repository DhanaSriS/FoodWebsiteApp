package com.example.backend.services;

import com.example.backend.models.OrderDetails;
import com.example.backend.models.OrderDisplayDTO;
import com.example.backend.models.OrderItemDTO;
import com.example.backend.models.orderModel;
import com.example.backend.repositories.orderDetailRepository;
import com.example.backend.repositories.orderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class orderService {
    @Autowired
    orderRepository orderRepository;
    @Autowired
    orderDetailRepository orderDetailRepo;

    public List<OrderDisplayDTO> findCustomerOrders(Long custId) {
        List<Object[]> results = orderDetailRepo.findOrdersByCustomerId(custId);
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
    public Iterable<orderModel> selectAll() {
        return orderRepository.findAll();
    }

    public orderModel insertOne(orderModel orderModel) {
        return orderRepository.save(orderModel);
    }

    public List<orderModel> getOrdersByRestaurantId(Long restId) {
        return orderRepository.findByRestIdOrderByOrderIdDesc(restId);
    }

    public List<orderModel> getOrdersByDeliveryId(Long dpId) {
        return orderRepository.findByDpidOrderByOrderIdDesc(dpId);
    }

    public List<orderModel> getOrdersByCustomerId(Long custId) {
        return orderRepository.findByCustIdOrderByOrderIdDesc(custId);
    }

//    //public void saveOrder(orderModel order) {
//        orderRepository.save(order);
//    }
public orderModel saveOrder(orderModel order) {
    return orderRepository.save(order);
}

    public void saveOrderDetail(OrderDetails orderDetail) {
        orderDetailRepo.save(orderDetail);
    }


    @Transactional
    public void updateOrderStatusAndTime(Long orderId, String status, Timestamp deliveryTime) {
        orderModel order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }

        // Update the order status and delivery time
        order.setOrderStatus(status);
        order.setDeliveryTime(deliveryTime);
        orderRepository.save(order);
    }
}
