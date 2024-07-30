package com.example.backend.models;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Table(name = "roles")
public class rolesModel {
    @Id
    @Column(name = "mail", nullable = false, unique = true)
    private String email;

    @Column(name = "userrole", nullable = false)
    private int userrole;


}
