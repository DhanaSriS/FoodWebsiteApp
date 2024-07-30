package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@Table(name = "Restaurant")
public class restaurantModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="rest_id")
    private Long restId;

    @NotBlank(message = "Restaurant name is required")
    @Size(max = 255, message = "Restaurant name must be less than 255 characters")
    @Column(name = "rest_name", nullable = false)
    private String restName;

    @NotNull(message = "Restaurant Address is required")
    @Column(name = "rest_address", nullable = false)
    private String restAddress;

    @NotBlank(message = "mobileNumber is required")
    @Column(name = "rest_phone", nullable = false, unique = true)
    private Long restPhone;

    @Email
    @Column(name = "rest_mail")
    private String restMail;

    @NotBlank(message = "Restaurant password is required")
    @Size(min = 4, message = "Restaurant password must be at least 4 characters long")
    @Column(name = "rest_pswd")
    private String restPswd;
}
