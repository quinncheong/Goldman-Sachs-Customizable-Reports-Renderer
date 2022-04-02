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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import thefoorbarfighters.gsengage.controllers.ApiConnectionClient;

import java.io.*;
import java.util.*;

@Service
public class TemplateService {

    @Autowired
    FileService fileService;

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${s3.databucket.name}")
    private String s3DataBucketName;

    @Value("${s3.templatebucket.name}")
    private String s3TemplateBucketName;

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

    public Map<String, Object> uploadTemplate(Map<String, Object> rawData) {
        Map<String, Object> serviceResponse = createBaseResponse();
        Map<String, Object> outputResponse = new HashMap<>();
        Object arrays;

        try {
            Map<String, Object> compiled = (Map<String, Object>) rawData.get("compiled");
            //iterate through every key
            for (Map.Entry<String, Object> sheet : compiled.entrySet()) {
                arrays = sheet.getValue();
                System.out.println("New Sheet");
                System.out.println(arrays);
            }

//            if (outputResponse != null) {
//                fileService.upload(template, outputResponse);
//            }
        } catch (Exception e) {
            jobFail(serviceResponse);
            e.printStackTrace();
        }
        return serviceResponse;
    }

    public Map<String, Object> getAllTemplates() {
        Map<String, Object> serviceResponse = new HashMap<>();
        String fileURL;
        String fullName;

        ListObjectsV2Request req = new ListObjectsV2Request();
        req.setBucketName(fileService.getBucketName("template"));
        ListObjectsV2Result result;
        result = amazonS3.listObjectsV2(req);

        for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
            fullName = objectSummary.getKey();
            fileURL = fileService.getFileURL("template", fullName);
            serviceResponse.put(fullName, fileURL);
        }
        return serviceResponse;
    }

    public Map<String, Object> getTemplate(String templateName) {
        Map<String, Object> serviceResponse = createBaseResponse();
        try {
            InputStreamResource s3Data = new InputStreamResource(fileService.downloadFile("template", templateName));
            InputStream s3DataStream = s3Data.getInputStream();

            ObjectMapper objmapper = new ObjectMapper();
            Map<String, Object> tmpSuccessResponse = (Map<String, Object>) serviceResponse.get("success");
            tmpSuccessResponse.put("template", objmapper.readValue(s3DataStream, Map.class));
            jobSuccess(serviceResponse);
        } catch (Exception e) {
            jobFail(serviceResponse);
            e.printStackTrace();
        }
        return serviceResponse;
    }
}