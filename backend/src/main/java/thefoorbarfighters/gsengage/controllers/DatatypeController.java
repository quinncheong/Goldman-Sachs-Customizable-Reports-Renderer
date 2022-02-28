package thefoorbarfighters.gsengage.controllers;

import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import thefoorbarfighters.gsengage.service.DatatypeService;

@RestController
@RequestMapping("/datatype")
public class DatatypeController {
    // Send POST request to python data processing API
    // Return API response

    @PostMapping("/analyze")
    public JSONObject analyzeDatatype(@RequestBody JSONObject rawData){
        return DatatypeService.getDatatype(rawData);
    }

}
