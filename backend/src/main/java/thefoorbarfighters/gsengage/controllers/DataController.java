package thefoorbarfighters.gsengage.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thefoorbarfighters.gsengage.service.DataService;
import java.util.Map;

@RestController
@RequestMapping(value = "/data")
public class DataController {
    // Send POST request to python APIs
    // Return API response

    @GetMapping("/")
    public String index() {
        return "Report Generation Backend";
    }

    @PostMapping(value = "/analyze")
    public Map<String, Object> analyzeDatatype(@RequestBody Map<String, Object> rawData){
        return DataService.getDatatype(rawData);
    }

    @PostMapping(value = "/report", headers = "Accept=application/json")
    public Map<String, Object> createData(@RequestBody Map<String, Object> rawData){
        return DataService.getReport(rawData);
    }

}