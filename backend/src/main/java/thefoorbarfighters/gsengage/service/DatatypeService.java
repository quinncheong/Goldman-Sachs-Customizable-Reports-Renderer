package thefoorbarfighters.gsengage.service;

import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;
import thefoorbarfighters.gsengage.controllers.ApiConnectionClient;

@Service
public class DatatypeService{

    public static JSONObject getDatatype(JSONObject rawData){
        final String apiUrl = "http://localhost:8000/process";
        try {
            return ApiConnectionClient.sendPost(apiUrl, rawData);
        } catch (Exception e) {
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", e);
            return errorResponse;
        }
    }

    public static JSONObject getReport(JSONObject rawData){
        final String apiUrl = "http://localhost:8000/report";
        try {
            return ApiConnectionClient.sendPost(apiUrl, rawData);
        } catch (Exception e) {
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", e);
            return errorResponse;
        }
    }
}
