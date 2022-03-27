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
import java.util.*;

@Service
public class DataService{

    @Autowired
    FileService fileService;

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

    public Map<String, Object> getReportFromTemplate(Map<String, Object> rawData){
        Map<String, Object> serviceResponse = createBaseResponse();
        final boolean parseFile = true;
        final String apiUrl = dataAPI + "/report";
        final String template_type = (String) rawData.get("template_type");
        try {
            if (Objects.equals(template_type, "simple")) {
                Map<String, Object> metadata = (Map<String, Object>) rawData.get("metadata");
                String fileName = (String) metadata.get("filename");
                int projectName = (int) metadata.get("project");
                List<String> sourceFilenames = (List<String>) metadata.get("files");
                String sourceFilename = sourceFilenames.get(0);
                String sourceFilenameNoExt = sourceFilename.replaceAll(".json", "");

                // create complied section
                Map<String, Object> compiled = new HashMap();
                Map<String, Object> colMap = new HashMap();
                Map<String, Object> inputData = (Map<String, Object>) rawData.get("data");
                Map<String, Object> datatypes = getDatatype(inputData);
                Map<String, Object> successData = (Map<String, Object>) datatypes.get("success");
                Map<String, Object> datasetData = (Map<String, Object>) successData.get(sourceFilenameNoExt);
                Map<String, Object> rowTypeData = (Map<String, Object>) datasetData.get("rows");
                Set<String> columns = rowTypeData.keySet();
                // define fixed data relationship since there is no need for sums
                Map<String, Object> dataRelationship = new HashMap();
                dataRelationship.put("data", sourceFilenameNoExt);
                dataRelationship.put("sum", false);
                for (String column : columns) {
                    colMap.put(column, dataRelationship);
                }
                // define single table in a single page for compiled
                List<Map> baseTable = new ArrayList();
                baseTable.add(colMap);
                List<List> allTables = new ArrayList();
                allTables.add(baseTable);
                compiled.put("Holdings", allTables);

                // create reformatted data map based of only 'rows' from the raw data
                Map<String, Object> reformattedData = new HashMap();
                Map<String, Object> reportData = (Map<String, Object>) inputData.get(sourceFilenameNoExt);
                List<Map> rowData = (List<Map>) reportData.get("rows");
                reformattedData.put(sourceFilenameNoExt, rowData);

                // create map that conforms to /report requirements (metadata, compiled, data)
                Map<String, Object> templateRawData = new HashMap();
                templateRawData.put("metadata", metadata);
                templateRawData.put("compiled", compiled);
                templateRawData.put("data", reformattedData);

                // get report from /report
                MultipartFile outputResponse = null;
                ApiConnectionClient connection = new ApiConnectionClient();
                connection.sendPost(apiUrl, templateRawData, parseFile);
                InputStream inputStream = new ByteArrayInputStream(connection.getFileResponse());
                outputResponse = new MockMultipartFile(fileName, fileName, ContentType.APPLICATION_OCTET_STREAM.toString(), inputStream);

                // Upload to AWS S3 bucket
                if (outputResponse != null) {
                    fileService.uploadWithFolderNumber(outputResponse, projectName);
                }

                // Return excel report
                final String newReportPath = projectName + "/" + fileName;
                String reportUrl = fileService.getFileURL(newReportPath);
                jobSuccess(serviceResponse);
                Map<String, Object> tmpSuccessResponse = (Map<String, Object>) serviceResponse.get("success");
                tmpSuccessResponse.put("report_url", reportUrl);
                serviceResponse.put("success", tmpSuccessResponse);
            }
        } catch (Exception e) {
            jobFail(serviceResponse);
            e.printStackTrace();
        }
        return serviceResponse;
    }

    public Map<String, Object> getDatatype(Map<String, Object> fullData){
        final boolean parseFile = false;
        final String apiUrl = dataAPI + "/process";
        Map<String, Object> serviceResponse = createBaseResponse();

        final Map<String, Object> rawData = (Map<String, Object>) fullData.get("data");
        
        // can comment out if just want the data in response
        final String template_type = fullData.get("template_type").toString();
        final Map<String, Object> metadata = (Map<String, Object>) fullData.get("metadata");
        serviceResponse.put("template_type", template_type);
        serviceResponse.put("metadata", metadata);
        
        for (Map.Entry<String, Object> report : rawData.entrySet()) {
            String reportName = report.getKey();
            try {
                ApiConnectionClient connection = new ApiConnectionClient();
                connection.sendPost(apiUrl, report, parseFile);
                Map<String, Object> tmpSuccessResponse = (Map<String, Object>) serviceResponse.get("success");
                tmpSuccessResponse.put(reportName, connection.getMapResponse().get(reportName));
                serviceResponse.put("success", tmpSuccessResponse);
                jobSuccess(serviceResponse);
            } catch (Exception e) {
                jobFail(serviceResponse);
                e.printStackTrace();
            }
        }
        return serviceResponse;
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

            // Get template_type
            String template_type = (String) metadata.get("template_type");

            // Get datasets from S3 and store into datasets
            Map<String, Object> datasets = new HashMap<>();
            for (String sourceFilename : sourceFilenames) {
                final String path = projectName + "/" + sourceFilename;

                InputStreamResource s3Data = new InputStreamResource(fileService.downloadFile(path));
                InputStream s3DataStream = null;
                s3DataStream = s3Data.getInputStream();

                ObjectMapper mapper = new ObjectMapper();
                Map<String, Object> data = mapper.readValue(s3DataStream, Map.class);
                Map<String, Object> actualdata = (Map<String, Object>) data.get("body");
                
                // to get first value which contains data
                Iterator<Map.Entry<String, Object>> iterator = actualdata.entrySet().iterator();
                Map.Entry<String, Object> actualValue = iterator.next();
                Map<String, Object> columnRow = (Map<String, Object>) actualValue.getValue();
                Object rows = columnRow.get("rows");

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
                fileService.uploadWithFolderNumber(outputResponse, projectName);
            }

            // Return excel report
            final String newReportPath = projectName + "/" + fileName;
            String reportUrl = fileService.getFileURL(newReportPath);
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
}
