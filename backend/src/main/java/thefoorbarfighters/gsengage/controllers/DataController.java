package thefoorbarfighters.gsengage.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import thefoorbarfighters.gsengage.service.DataService;

@RestController
@RequestMapping(value = "/data")
public class DataController {
    // Send POST request to python APIs
    // Return API response

    @GetMapping("/")
    public String index() {
        return "Report Generation Backend";
    }

    @PostMapping(value = "/analyze", headers = "Accept=application/json")
    public JSONObject analyzeDatatype(@RequestBody JSONObject rawData){
        return DataService.getDatatype(rawData);
    }

    @PostMapping(value = "/report", headers = "Accept=application/json")
    public JSONObject createData(@RequestBody JSONObject rawData){
        return DataService.getReport(rawData);
    }

}
