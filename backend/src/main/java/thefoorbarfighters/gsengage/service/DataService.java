package thefoorbarfighters.gsengage.service;

import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import thefoorbarfighters.gsengage.controllers.ApiConnectionClient;
import thefoorbarfighters.gsengage.controllers.FileController;

import java.io.DataInput;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DataService{

    @Autowired
    FileService fileService;

    private static String dataAPI = "http://localhost:8000/api/v1";

    public Map<String, Object> getDatatype(Map<String, Object> rawData){
        final boolean parseFile = false;
        final String apiUrl = dataAPI + "/process";
        System.out.println(apiUrl);
        Map<String, Object> compiledResponse = new HashMap<>();

        for (Map.Entry<String, Object> report : rawData.entrySet()) {
            String reportName = report.getKey();
//            Object reportValue = report.getValue();
            Map<String, Object> reportValue = new HashMap<>();
            reportValue.put(reportName, report.getValue());

            try {
                ApiConnectionClient connection = new ApiConnectionClient();
                connection.sendPost(apiUrl, reportValue, parseFile);
                Map<String, Object> message = connection.getMapResponse();
                compiledResponse.put(reportName, message.get(reportName));
            } catch (Exception e) {
                compiledResponse.put("error", e);
                e.printStackTrace();
            }
        }
        return compiledResponse;
    }

    public Path getReport(Map<String, Object> rawData){
        final boolean parseFile = true;
        final String apiUrl = dataAPI + "/report";
        // Get required dataset names
        Map<String, Object> metadata = (Map<String, Object>) rawData.get("metadata");
        String projectName = (String) metadata.get("project");
        List<String> filenames = (List<String>) metadata.get("files");
        System.out.println(filenames);

        // Get datasets from S3
        Map<String, Object> datasets = new HashMap<>();
        // TODO: @Joel to help with downloading each data file and adding it to the map
        for (String filename: filenames) {
            System.out.println(filename);
            // TODO: get dataset data
            final String path = projectName + "/" + filename;
            System.out.println(path);
            InputStreamResource s3Data = new InputStreamResource(fileService.downloadFile(path));
            InputStream s3DataStream = null;
            try {
                s3DataStream = s3Data.getInputStream();
            } catch (IOException e) {
                e.printStackTrace();
            }

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> data = null;
            try {
                data = mapper.readValue(s3DataStream, Map.class);
            } catch (IOException e) {
                e.printStackTrace();
            }

            for (Map.Entry<String, Object> pair : data.entrySet()) {
                datasets.put(pair.getKey(), pair.getValue());
            }
        }

        // Recompile data for /report
        Map<String, Object> subMetadata = new HashMap<>();
        subMetadata.put("filename", (String) metadata.get("filename"));
        subMetadata.put("project", (String) metadata.get("project"));

        Map<String, Object> reportData = new HashMap<>();
        reportData.put("metadata", (Map<String, Object>) subMetadata);
        reportData.put("compiled", (Map<String, Object>) rawData.get("compiled"));
        reportData.put("data", datasets);

        // Get report from /report
        Path outputResponse = null;
        try {
            ApiConnectionClient connection = new ApiConnectionClient();
            connection.sendPost(apiUrl, reportData, parseFile);
            outputResponse = connection.getFileResponse();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return outputResponse;
        // TODO: @Joel to help with uploading to S3 bucket and returning report
        // Upload to AWS S3 bucket
//        if (outputResponse != null) {
//            fileService.upload((MultipartFile) outputResponse);
//        }
//        return null;
        // Return excel report
    }
}
