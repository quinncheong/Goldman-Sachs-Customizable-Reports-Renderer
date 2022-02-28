package thefoorbarfighters.gsengage.service;

import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;
import thefoorbarfighters.gsengage.controllers.ApiConnectionClient;

@Service
public class DatatypeService{

    public static JSONObject getDatatype(JSONObject rawData){
        final String apiUrl = "https://localhost:8080/process";
        try {
            return ApiConnectionClient.sendPost(apiUrl, rawData);
        } catch (Exception e) {
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", e);
            return errorResponse;
        }
    }
}
