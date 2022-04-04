package thefoorbarfighters.gsengage.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import thefoorbarfighters.gsengage.service.DataService;

import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1/")
public class DataController {

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

    @GetMapping(value = "/existing")
    public Map<String, Object> getExistingData(){
        return dataService.getExistingData();
    }

}
