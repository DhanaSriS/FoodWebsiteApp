package com.example.backend.services;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.backend.models.customerModel;
import com.example.backend.models.orderModel;
import com.example.backend.repositories.customerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class customerService {
    @Autowired
    private customerRepository customerRepository;

    @Autowired
    private orderService order_Service;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public customerModel saveCustomer(customerModel customer) {
        customer.setCustPswd(passwordEncoder.encode(customer.getCustPswd()));
        return customerRepository.save(customer);
    }

    // public customerModel saveCustomer(customerModel customer) {
    //     //customer.setCustPswd(passwordEncoder.encode(customer.getCustPswd()));
    //     return customerRepository.save(customer);
    // }
    public List<customerModel> getAllCustomers() {
        return (List<customerModel>) customerRepository.findAll();
    }

    public customerModel getCustomerById(Long id) {
        Optional<customerModel> customerOptional = customerRepository.findById(id);
        return customerOptional.orElse(null);
    }

    public customerModel updateCustomer(customerModel customer) {
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    public boolean validateLogin(String email,String pass){
        customerModel acc = customerRepository.findByCustMail(email);
        return passwordEncoder.matches(pass, acc.getCustPswd());  
    }
    
    // private customerModel findByMail(String email) {
    //     return customerRepository.findByCustMail(email);
    // }

    public List<orderModel> findCustomerOrders(Long custId) {
        return order_Service.getOrdersByCustomerId(custId);
    }

}
