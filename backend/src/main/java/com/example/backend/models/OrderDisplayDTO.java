// package com.example.backend.models;

// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// import java.util.List;

// @Getter
// @Setter
// @AllArgsConstructor
// @NoArgsConstructor
// public class OrderDisplayDTO {
//     private Long orderId;
//     private String restName;
//     private double orderTotal;
//     private List<OrderItemDTO> items;


// }
package com.example.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDisplayDTO {
    private Long orderId;
    private String restName;
    private double orderTotal;
    private List<OrderItemDTO> items;
    private Long custId;          // Added customer ID
    private String custPhone;     // Added customer phone
    private String custLocation;  // Added customer location
}
