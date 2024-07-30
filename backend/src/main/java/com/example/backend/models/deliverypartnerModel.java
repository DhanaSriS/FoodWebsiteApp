package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
@Table(name = "Delivery_partner")
@Entity
public class deliverypartnerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="delivery_id")
    public Long deliveryId;

    @NotBlank(message = "mobileNumber is required")
    @Size(min = 10, max = 10)
    @Column(name = "delivery_phn")
    public long deliveryPhn;

    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")
    @Column(name = "dp_mail")
    public String dpMail;

    @Column(name = "dp_pswd")
    public String dpPswd;

    @Column(name = "dp_name")
    public String deliveryName;

    @Column(name="dp_available")
    private boolean dpavailable;
}
 