package thefoorbarfighters.gsengage.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import thefoorbarfighters.gsengage.service.TemplateService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/templates")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TemplateController {

    @Autowired
    TemplateService templateService;

    @PostMapping(value = "/upload", headers = "Accept=application/json")
    public Map<String, Object> uploadTemplate(@RequestBody Map<String, Object> rawData){
        return templateService.uploadTemplate(rawData);
    }

}