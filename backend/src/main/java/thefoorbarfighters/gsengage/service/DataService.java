package thefoorbarfighters.gsengage.service;

import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import thefoorbarfighters.gsengage.controllers.ApiConnectionClient;
import thefoorbarfighters.gsengage.controllers.FileController;
import org.springframework.mock.web.MockMultipartFile;


import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    public Map<String, Object> getReport(Map<String, Object> rawData){
        final boolean parseFile = true;
        final String apiUrl = dataAPI + "/report";
        // Get required dataset names
        Map<String, Object> metadata = (Map<String, Object>) rawData.get("metadata");
        String fileName = (String) metadata.get("filename");
        int projectName = (int) metadata.get("project");
        List<String> filenames = (List<String>) metadata.get("files");
        System.out.println(filenames);

        // Get datasets from S3
        Map<String, Object> datasets = new HashMap<>();
        for (String filename: filenames) {
            System.out.println(filename);
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
        subMetadata.put("filename", fileName);
        subMetadata.put("project", projectName);

        Map<String, Object> reportData = new HashMap<>();
        reportData.put("metadata", (Map<String, Object>) subMetadata);
        reportData.put("compiled", (Map<String, Object>) rawData.get("compiled"));
        reportData.put("data", datasets);

        // Get report from /report
        MultipartFile outputResponse = null;
        try {
            ApiConnectionClient connection = new ApiConnectionClient();
            connection.sendPost(apiUrl, reportData, parseFile);
            InputStream inputStream = new ByteArrayInputStream(connection.getFileResponse());
            outputResponse = new MockMultipartFile(fileName, fileName, ContentType.APPLICATION_OCTET_STREAM.toString(), inputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }


        // Upload to AWS S3 bucket
        if (outputResponse != null) {
            System.out.println("done");
            try {
                fileService.uploadWithFolderNumber(outputResponse, projectName);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("sadge");
        }

//         Return excel report
        final String newReportPath = projectName + "/" + fileName;
        String reportUrl = fileService.getFileURL(newReportPath);

        Map<String, Object> reportResults = new HashMap();
        reportResults.put("success", 1);
        reportResults.put("report_url", reportUrl);
        reportResults.put("failed", 0);
        return reportResults;
    }
}
