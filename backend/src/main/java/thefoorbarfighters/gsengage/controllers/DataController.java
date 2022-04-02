package thefoorbarfighters.gsengage.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import thefoorbarfighters.gsengage.service.DataService;

import java.nio.file.Path;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1/")
public class DataController {
    // Send POST request to python APIs
    // Return API response

    @Autowired
    DataService dataService;

    @GetMapping("/")
    public String index() {
        return "Report Generation Backend";
    }

    @PostMapping(value="/upload", headers = "Accept=application/json")
    public Map<String, Object> uploadDatatype(@RequestBody Map<String, Object> rawData){
        return dataService.uploadData(rawData);
    }

    @PostMapping(value = "/analyze", headers = "Accept=application/json")
    public Map<String, Object> analyzeDatatype(@RequestBody Map<String, Object> rawData){
        return dataService.getDatatype(rawData);
    }

    @PostMapping(value = "/report", headers = "Accept=application/json")
    public Map<String, Object> createData(@RequestBody Map<String, Object> rawData){
        return dataService.getReport(rawData);
    }

}
