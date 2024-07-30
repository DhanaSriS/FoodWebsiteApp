//package com.example.backend.services;
//
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.beans.factory.annotation.Value;
//import org.json.JSONObject;
//
//@Service
//public class GeocodingService {
//
//    @Value("${google.api.key}")
//    private String apiKey;
//
//    private static final String GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
//
//    public double[] getLatLong(String address) throws Exception {
////        String url = GEOCODING_API_URL + "?address=" + address.replace(" ", "%20") + "&key=" + apiKey;
//        RestTemplate restTemplate = new RestTemplate();
//        String response = restTemplate.getForObject(url, String.class);
//
//        JSONObject json = new JSONObject(response);
//        if (!json.getJSONArray("results").isEmpty()) {
//            JSONObject location = json.getJSONArray("results")
//                    .getJSONObject(0)
//                    .getJSONObject("geometry")
//                    .getJSONObject("location");
//            return new double[]{location.getDouble("lat"), location.getDouble("lng")};
//        } else {
//            throw new Exception("No results found for address");
//        }
//    }
//}
