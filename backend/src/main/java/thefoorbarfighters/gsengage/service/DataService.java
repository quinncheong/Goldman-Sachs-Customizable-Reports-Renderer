package thefoorbarfighters.gsengage.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import thefoorbarfighters.gsengage.controllers.FileController;
import thefoorbarfighters.gsengage.controllers.ApiConnectionClient;

@Service
public class DataService{

    private static String dataAPI = "http://localhost:8000/api/v1";

    public static Map<String, Object> getDatatype(Map<String, Object> rawData){
        final String apiUrl = dataAPI.concat("/process");
        System.out.println(apiUrl);
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
        final String apiUrl = dataAPI.concat("/report");
        // Get required dataset names
        Map<String, Object> metadata = (Map<String, Object>) rawData.get("metadata");
        String projectName = (String) metadata.get("project");
        List<String> filenames = (List<String>) metadata.get("files");

        // Get datasets from S3
        Map<String, Object> datasets = new HashMap<>();
        // TODO: @Joel to help with downloading each data file and adding it to the map
//        for (String filename: filenames) {
//            // TODO: get dataset data
//            Map<String, Object> data = FileController.downloadFile(name=filename);
//            datasets.put(filename, data);
//        }

        // Recompile data for /report
        Map<String, Object> reportData = new HashMap<>();
        reportData.put("metadata", (Map<String, Object>) metadata.get("filename"));
        reportData.put("compiled", (Map<String, Object>) rawData.get("compiled"));
        reportData.put("data", datasets);

        // Get report from /report
        try {
            ApiConnectionClient connection = new ApiConnectionClient();
            connection.sendPost(apiUrl, reportData);
            return connection.getResponse();
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e);
            return response;
        }

        // TODO: @Joel to help with uploading to S3 bucket and returning report
        // Upload to AWS S3 bucket

        // Return excel report
    }
}
