package thefoorbarfighters.gsengage.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import thefoorbarfighters.gsengage.controllers.ApiConnectionClient;
import org.springframework.mock.web.MockMultipartFile;

import java.io.*;
import java.util.*;

@Service
public class DataService{

    @Autowired
    FileService fileService;

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${s3.databucket.name}")
    private String s3DataBucketName;

    @Value("${s3.templatebucket.name}")
    private String s3TemplateBucketName;

    private static String dataAPI = "http://localhost:8000/api/v1";

    private Map<String, Object> createBaseResponse() {
        Map<String, Object> baseResponse = new HashMap<>();
        Map<String, Object> successCountResponse = new HashMap();
        Map<String, Object> failureCountResponse = new HashMap();
        successCountResponse.put("count", (Integer) 0);
        failureCountResponse.put("count", (Integer) 0);
        baseResponse.put("success", successCountResponse);
        baseResponse.put("failure", failureCountResponse);
        return baseResponse;
    }

    private Map<String, Object> jobSuccess(Map<String, Object> apiResponse) {
        Map<String, Object> tmpResponse = (Map<String, Object>) apiResponse.get("success");
        Integer newSuccessCount = ((Integer) tmpResponse.get("count")) + 1;
        tmpResponse.put("count", newSuccessCount);
        apiResponse.put("success", tmpResponse);
        return apiResponse;
    }

    private Map<String, Object> jobFail(Map<String, Object> apiResponse) {
        Map<String, Object> tmpResponse = (Map<String, Object>) apiResponse.get("failure");
        Integer newFailureCount = ((Integer) tmpResponse.get("count")) + 1;
        tmpResponse.put("count", newFailureCount);
        apiResponse.put("failure", tmpResponse);
        return apiResponse;
    }

    private Map<String, Object> getS3Data(Integer projectName, String sourceFilename) {
        Map<String, Object> dataResponse = null;
        try {
            final String path = projectName + "/" + sourceFilename;

            InputStreamResource s3Data = new InputStreamResource(fileService.downloadFile("data", path));
            InputStream s3DataStream = null;
            s3DataStream = s3Data.getInputStream();

            ObjectMapper objmapper = new ObjectMapper();
            dataResponse = objmapper.readValue(s3DataStream, Map.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataResponse;
    }

    public Map<String, Object> uploadData(Map<String, Object> fullData){
        Map<String, Object> serviceResponse = createBaseResponse();

        final Map<String, Object> metadata = (Map<String, Object>) fullData.get("metadata");
        final Integer projectName = (Integer) metadata.get("project");
        serviceResponse.put("metadata", metadata);

        final Map<String, Object> rawData = (Map<String, Object>) fullData.get("data");

        for (Map.Entry<String, Object> report : rawData.entrySet()) {
            String reportName = report.getKey();

            try {
                MultipartFile fileToUpload = null;
                ObjectMapper objmapper = new ObjectMapper();
                String stringReport = objmapper.writeValueAsString(report);
                byte[] byteReport = stringReport.getBytes();
                fileToUpload = new MockMultipartFile(reportName, reportName, ContentType.APPLICATION_JSON.toString(), byteReport);
                if (fileToUpload != null) {
                    fileService.uploadWithFolderNumber("data", fileToUpload, projectName);
                    Map<String, Object> tmpSuccessResponse = (Map<String, Object>) serviceResponse.get("success");
                    serviceResponse.put("success", tmpSuccessResponse);
                    jobSuccess(serviceResponse);
                }
            } catch (Exception e) {
                jobFail(serviceResponse);
                e.printStackTrace();
            }
        }
        return serviceResponse;
    }

    public Map<String, Object> getDatatype(Map<String, Object> fullData){
        final boolean parseFile = false;
        final String apiUrl = dataAPI + "/process";
        Map<String, Object> serviceResponse = createBaseResponse();

        final Map<String, Object> metadata = (Map<String, Object>) fullData.get("metadata");
        final Integer projectName = (Integer) metadata.get("project");
        serviceResponse.put("metadata", metadata);

//        final Map<String, Object> rawData = (Map<String, Object>) fullData.get("data");

        for (String sourceFilename : (List<String>) metadata.get("files")) {
            Map<String, Object> report = getS3Data(projectName, sourceFilename);
            System.out.println(report);
            try {
                ApiConnectionClient connection = new ApiConnectionClient();
                connection.sendPost(apiUrl, report, parseFile);
                Map<String, Object> tmpSuccessResponse = (Map<String, Object>) serviceResponse.get("success");
                tmpSuccessResponse.put(sourceFilename, connection.getMapResponse().get(sourceFilename));

                serviceResponse.put("success", tmpSuccessResponse);
                jobSuccess(serviceResponse);
            } catch (Exception e) {
                jobFail(serviceResponse);
                e.printStackTrace();
            }
        }
        return serviceResponse;
    }

    public Map<String, Object> getReport(Map<String, Object> rawData) {
        Map<String, Object> serviceResponse = createBaseResponse();
        final boolean parseFile = true;
        final String apiUrl = dataAPI + "/report";

        try {
            // Get required dataset names
            Map<String, Object> metadata = (Map<String, Object>) rawData.get("metadata");
            String fileName = (String) metadata.get("filename");
            int projectName = Integer.parseInt(metadata.get("project").toString());
            List<String> sourceFilenames = (List<String>) metadata.get("files");

            // Get datasets from S3 and store into datasets
            Map<String, Object> datasets = new HashMap<>();
            for (String sourceFilename : sourceFilenames) {
                Map<String, Object> rows = getS3Data(projectName, sourceFilename);
                datasets.put(sourceFilename, rows);
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
            ApiConnectionClient connection = new ApiConnectionClient();
            connection.sendPost(apiUrl, reportData, parseFile);
            InputStream inputStream = new ByteArrayInputStream(connection.getFileResponse());
            outputResponse = new MockMultipartFile(fileName, fileName, ContentType.APPLICATION_OCTET_STREAM.toString(), inputStream);

            // Upload to AWS S3 bucket
            // TODO: upload compiled as json
            if (outputResponse != null) {
                fileService.uploadWithFolderNumber("data", outputResponse, projectName);
            }

            // Return excel report
            final String newReportPath = projectName + "/" + fileName;
            String reportUrl = fileService.getFileURL("data", newReportPath);
            jobSuccess(serviceResponse);
            Map<String, Object> tmpSuccessResponse = (Map<String, Object>) serviceResponse.get("success");
            tmpSuccessResponse.put("report_url", reportUrl);
            serviceResponse.put("success", tmpSuccessResponse);
        } catch (Exception e) {
            jobFail(serviceResponse);
            e.printStackTrace();
        }

        return serviceResponse;
    }

    public Map<String, Object> getExistingData() {
//        Map<String, Object> serviceResponse = createBaseResponse();
        Map<String, Object> serviceResponse = new HashMap<>();
        String fileURL;
        String fullName;
        String[] arr;
        String fileName;
        int folderName;
        String keyName;

        ListObjectsV2Request req = new ListObjectsV2Request();
        req.setBucketName(s3DataBucketName);
        ListObjectsV2Result result;
        result = amazonS3.listObjectsV2(req);


        for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
            fullName = objectSummary.getKey();
            arr = fullName.split("/");

            if (arr.length > 1) {
                folderName = Integer.parseInt(arr[0]);
                fileName = arr[1];
                keyName = folderName + "_" + fileName;
                fileURL = fileService.getFileURL("data", fullName);
                serviceResponse.put(keyName, fileURL);
            }
        }
        return serviceResponse;
    }
}
