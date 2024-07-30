package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "customer")
public class customerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cust_id")
    private Long custId;

    @NotBlank(message = "Customer name is required")
    @Size(max = 255, message = "Customer name must be less than 255 characters")
    @Column(name = "cust_name", nullable = false)
    private String custName;

    @NotBlank(message = "Customer address is required")
    @Column(name = "cust_address", nullable = false)
    private String custAddress;

    @NotNull(message = "Customer phone number is required")
    @Column(name = "cust_phone", nullable = false)
    private Long custPhone;

    @NotBlank(message = "Customer email is required")
    @Email(message = "Customer email should be valid")
    @Column(name = "cust_mail", nullable = false, unique = true)
    private String custMail;

    @NotBlank(message = "Customer password is required")
    @Size(min = 4, message = "Customer password must be at least 4 characters long")
    @Column(name = "cust_pswd", nullable = false)
    private String custPswd;

    // Getters and Setters

    public Long getCustId() {
        return custId;
    }

    public void setCustId(Long custId) {
        this.custId = custId;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getCustAddress() {
        return custAddress;
    }

    public void setCustAddress(String custAddress) {
        this.custAddress = custAddress;
    }

    public Long getCustPhone() {
        return custPhone;
    }

    public void setCustPhone(Long custPhone) {
        this.custPhone = custPhone;
    }

    public String getCustMail() {
        return custMail;
    }

    public void setCustMail(String custMail) {
        this.custMail = custMail;
    }

    public String getCustPswd() {
        return custPswd;
    }

    public void setCustPswd(String custPswd) {
        this.custPswd = custPswd;
    }

    // Constructors

    public customerModel() {
    }

    public customerModel(String custName, String custAddress, Long custPhone, String custMail, String custPswd) {
        this.custName = custName;
        this.custAddress = custAddress;
        this.custPhone = custPhone;
        this.custMail = custMail;
        this.custPswd = custPswd;
    }
}

