package thefoorbarfighters.gsengage.service;

import com.amazonaws.services.s3.AmazonS3;
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


        try {
            Map<String, Object> compiled = (Map<String, Object>) rawData.get("compiled");
            //iterate through every key
            for (Map.Entry<String, Object> sheet : compiled.entrySet()) {
//                String tables = sheet.getValue();
//                System.out.println(tables);
            }

//            if (outputResponse != null) {
//                fileService.uploadWithFolderNumber(outputResponse, projectName);
//            }
        } catch (Exception e) {
            jobFail(serviceResponse);
            e.printStackTrace();
        }
        return serviceResponse;
    }

    public Map<String, Object> getAllTemplates() {
        return new HashMap<>();
    }

    public Map<String, Object> getTemplate(String templateName) {
        Map<String, Object> serviceResponse = createBaseResponse();
        try {
            InputStreamResource s3Data = new InputStreamResource(fileService.downloadFile("template", templateName));
            InputStream s3DataStream = null;
            s3DataStream = s3Data.getInputStream();

            ObjectMapper objmapper = new ObjectMapper();
            Map<String, Object> tmpSuccessResponse = (Map<String, Object>) serviceResponse.get("success");
            serviceResponse.put("success", objmapper.readValue(s3DataStream, Map.class));
            jobSuccess(serviceResponse);
        } catch (Exception e) {
            jobFail(serviceResponse);
            e.printStackTrace();
        }
        return serviceResponse;
    }
}