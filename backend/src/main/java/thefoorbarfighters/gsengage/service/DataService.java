package thefoorbarfighters.gsengage.service;

import java.util.Iterator;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import thefoorbarfighters.gsengage.controllers.ApiConnectionClient;

@Service
public class DataService{

    public static JSONObject getDatatype(JSONObject rawData){
        final String apiUrl = "http://localhost:8000/process";
//        JSONObject compiledResponse = new JSONObject();
//        return rawData;

//        for (Iterator iterator = rawData.keySet().iterator(); iterator.hasNext();) {
//            String key = (String) iterator.next();
//            JSONObject reportData = rawData.getJSONObject(key);
//            try {
//                ApiConnectionClient connection = new ApiConnectionClient();
//                connection.sendPost(apiUrl, reportData);
//                JSONObject response = connection.getResponse();
//                compiledResponse.put(key, response);
//            } catch (Exception e) {
////                JSONObject errorResponse = new JSONObject();
////                errorResponse.put(keyStr, e);
//                compiledResponse.put(key, e);
//            }
//        }
//        return compiledResponse.toString();
        ApiConnectionClient connection = new ApiConnectionClient();
        try {
            connection.sendPost(apiUrl, rawData);
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
//            JSONObject response = ApiConnectionClient.sendPost(apiUrl, rawData);

              return connection.getResponse()
        } catch (Exception e) {
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", e);
            return errorResponse.toString();
        }

    }

    public static JSONObject getReport(JSONObject rawData){
//        final String apiUrl = "http://localhost:8000/report";
//        try {
//            return ApiConnectionClient.sendPost(apiUrl, rawData);
//        } catch (Exception e) {
//            JSONObject errorResponse = new JSONObject();
//            errorResponse.put("error", e);
//            return errorResponse;
//        }
        return null;
    }
}
