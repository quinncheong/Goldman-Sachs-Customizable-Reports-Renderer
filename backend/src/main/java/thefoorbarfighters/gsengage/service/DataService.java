package thefoorbarfighters.gsengage.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import org.springframework.stereotype.Service;
import thefoorbarfighters.gsengage.controllers.ApiConnectionClient;

@Service
public class DataService{

    public static Map<String, Object> getDatatype(Map<String, Object> rawData){
        final String apiUrl = "http://localhost:8000/process";
        Map<String, Object> compiledResponse = new HashMap<>();

        for (Map.Entry<String, Object> report : rawData.entrySet()) {
            String reportName = report.getKey();
//            Object reportValue = report.getValue();
            Map<String, Object> reportValue = new HashMap<>();
            reportValue.put(reportName, report.getValue());

            try {
                ApiConnectionClient connection = new ApiConnectionClient();
                connection.sendPost(apiUrl, reportValue);
                Map<String, Object> message = connection.getResponse();
                compiledResponse.put(reportName, message.get(reportName));
            } catch (Exception e) {
                compiledResponse.put("error", e);
                e.printStackTrace();
            }
        }
        return compiledResponse;
    }

    public static Map<String, Object> getReport(Map<String, Object> rawData){
        final String apiUrl = "http://localhost:8000/report";
        try {
            ApiConnectionClient connection = new ApiConnectionClient();
            connection.sendPost(apiUrl, rawData);
            return connection.getResponse();
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e);
            return response;
        }
    }
}
