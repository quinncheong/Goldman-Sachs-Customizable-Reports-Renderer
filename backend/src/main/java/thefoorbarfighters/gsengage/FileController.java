package thefoorbarfighters.gsengage;

import thefoorbarfighters.gsengage.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/files")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileController {

    private static final String MESSAGE_1 = "Uploaded the file successfully";
    private static final String FILE_NAME = "test.js";

    @Autowired
    FileService fileService;

    @GetMapping
    public ResponseEntity<Object> findByName(@RequestBody(required = false) Map<String, String> params) {
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noCache())
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + "test.xlsx" + "\"")
                .body(new InputStreamResource(fileService.findByName("test.xlsx")));
    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestParam("file") MultipartFile multipartFile) {
        fileService.save(multipartFile);
        return new ResponseEntity<>(MESSAGE_1, HttpStatus.OK);
    }
}