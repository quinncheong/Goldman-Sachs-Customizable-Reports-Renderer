package thefoorbarfighters.gsengage.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import thefoorbarfighters.gsengage.service.DataService;

import java.util.List;
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
    public Map<String, Object> uploadDatatype(@RequestBody String rawData){
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

    @GetMapping(value = "/existing", headers = "Accept=application/json")
    public List<Map<String,Object>> getExistingData(@RequestHeader String fileExtension){
        return dataService.getAllExisting(fileExtension);
    }

}
