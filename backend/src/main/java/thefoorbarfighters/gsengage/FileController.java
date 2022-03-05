package thefoorbarfighters.gsengage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/files")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileController {

    private static final String MESSAGE_1 = "Uploaded the file successfully";

    @Autowired
    FileService fileService;

    @GetMapping
    public ResponseEntity<Object> findByName(@RequestBody(required = false) @RequestParam String name, @RequestParam int fileNumber) {
        String fullname = fileNumber + "/" + name;
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noCache())
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fullname + "\"")
                .body(new InputStreamResource(fileService.findByName(fullname)));
    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestParam("file") MultipartFile multipartFile, @RequestParam int fileNumber) {
        fileService.save(multipartFile, fileNumber);
        return new ResponseEntity<>(MESSAGE_1, HttpStatus.OK);
    }

    @GetMapping("/number")
    public ResponseEntity<Object> findNumberOfFiles() {
        int filecount = fileService.getBucketFileCount();
        return new ResponseEntity<>(filecount, HttpStatus.OK);
    }
}