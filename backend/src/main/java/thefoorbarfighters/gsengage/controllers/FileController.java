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
    public ResponseEntity<Object> downloadFile(@RequestParam("bucketType") String bucketType, @RequestBody(required = false) @RequestParam String name, @RequestParam int folderNumber) {
        String fullname = folderNumber + "/" + name;
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noCache())
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fullname + "\"")
                .body(new InputStreamResource(fileService.downloadFile(bucketType, fullname)));
    }

    @GetMapping("/getFileURL")
    public ResponseEntity<Object> getFileURL(@RequestParam("bucketType") String bucketType, @RequestBody(required = false) @RequestParam String name, @RequestParam int folderNumber) {
        String fullname = folderNumber + "/" + name;
        String fileUrl = fileService.getFileURL(bucketType, fullname);
        return new ResponseEntity<>(fileUrl, HttpStatus.OK);
    }

    @GetMapping("/findNumberOfFolders")
    public ResponseEntity<Object> findNumberOfFolders(@RequestParam("bucketType") String bucketType) {
        int filecount = fileService.findNumberOfFolders(bucketType);
        return new ResponseEntity<>(filecount, HttpStatus.OK);
    }

    @PostMapping("/uploadWithFolderNumber")
    public ResponseEntity<Object> uploadWithFileNumber(@RequestParam("bucketType") String bucketType, @RequestBody MultipartFile[] multipartFiles, @RequestParam int folderNumber) {
        for (MultipartFile multipartFile : multipartFiles) {
            fileService.uploadWithFolderNumber(bucketType, multipartFile, folderNumber);
        }
        return new ResponseEntity<>(MESSAGE_1, HttpStatus.OK);
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<Object> upload(@RequestParam("bucketType") String bucketType, @RequestBody MultipartFile[] multipartFiles) {
        for (MultipartFile multipartFile : multipartFiles) {
            fileService.upload(bucketType, multipartFile);
        }
        return new ResponseEntity<>(MESSAGE_1, HttpStatus.OK);
    }


}