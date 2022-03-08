package thefoorbarfighters.gsengage.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import thefoorbarfighters.gsengage.service.FileService;

@RestController
@RequestMapping("/api/v1/files")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileController {

    private static final String MESSAGE_1 = "Uploaded the file successfully";

    @Autowired
    FileService fileService;

    @GetMapping("/downloadFile")
    public ResponseEntity<Object> downloadFile(@RequestBody(required = false) @RequestParam String name, @RequestParam int fileNumber) {
        String fullname = fileNumber + "/" + name;
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noCache())
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fullname + "\"")
                .body(new InputStreamResource(fileService.downloadFile(fullname)));
    }

    @GetMapping("/getFileURL")
    public ResponseEntity<Object> getFileURL(@RequestBody(required = false) @RequestParam String name, @RequestParam int fileNumber) {
        String fullname = fileNumber + "/" + name;
        String URL = fileService.getFileURL(fullname);
        return new ResponseEntity<>(URL, HttpStatus.OK);
    }

    @GetMapping("/findNumberOfFolders")
    public ResponseEntity<Object> findNumberOfFolders() {
        int filecount = fileService.findNumberOfFolders();
        return new ResponseEntity<>(filecount, HttpStatus.OK);
    }

    @PostMapping("/uploadWithFileNumber")
    public ResponseEntity<Object> uploadWithFileNumber(@RequestParam("file") MultipartFile multipartFile, @RequestParam("fileNumber") int fileNumber) {
        fileService.uploadWithFileNumber(multipartFile, fileNumber);
        return new ResponseEntity<>(MESSAGE_1, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<Object> upload(@RequestParam("file") MultipartFile multipartFile) {
        fileService.upload(multipartFile);
        return new ResponseEntity<>(MESSAGE_1, HttpStatus.OK);
    }


}