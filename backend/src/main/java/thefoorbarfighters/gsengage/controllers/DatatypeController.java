package thefoorbarfighters.gsengage.controllers;

import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import thefoorbarfighters.gsengage.service.DatatypeService;

@RestController
@RequestMapping("/datatype")
public class DatatypeController {
    // Send POST request to python data processing API
    // Return API response

    @GetMapping("/")
    public String index() {
        return "Report Generation Backend";
    }

    @PostMapping(value = "/analyze", headers = "Accept=application/json")
    public JSONObject analyzeDatatype(@RequestBody JSONObject rawData){
        return DatatypeService.getDatatype(rawData);
    }

    @PostMapping(value = "/report", headers = "Accept=application/json")
    public JSONObject createData(@RequestBody JSONObject rawData){
        return DatatypeService.getReport(rawData);
    }

}
