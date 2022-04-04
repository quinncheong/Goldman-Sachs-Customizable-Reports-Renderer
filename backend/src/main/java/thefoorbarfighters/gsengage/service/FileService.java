package thefoorbarfighters.gsengage.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.time.Instant;

@Service
public class FileService {

    private static final Logger LOG = LoggerFactory.getLogger(FileService.class);

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${s3.databucket.name}")
    private String s3DataBucketName;

    @Value("${s3.templatebucket.name}")
    private String s3TemplateBucketName;

    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (IOException e) {
            LOG.error("Error {} occurred while converting the multipart file", e.getLocalizedMessage());
        }
        return file;
    }

    public String getBucketName(String bucketType) {
        if (bucketType.equals("data")) {
            return s3DataBucketName;
        } else {
            return s3TemplateBucketName;
        }
    }

    // @Async annotation ensures that the method is executed in a different thread

    @Async // download file by name
    public S3ObjectInputStream downloadFile(String bucketType, String fileName) {
        LOG.info("Downloading file with name {}", fileName);
        return amazonS3.getObject(getBucketName(bucketType), fileName).getObjectContent();
    }

     @Async // save file without file number
     public void upload(String bucketType, final MultipartFile multipartFile) {
         try {
             final File file = convertMultiPartFileToFile(multipartFile);
             int folderCount = this.findNumberOfFolders(getBucketName(bucketType));
             folderCount++;
             final String fileName = folderCount + "/" + file.getName();
             LOG.info("Uploading file with name {}", fileName);
             final PutObjectRequest putObjectRequest = new PutObjectRequest(getBucketName(bucketType), fileName, file);
             amazonS3.putObject(putObjectRequest);
             Files.delete(file.toPath()); // Remove the file locally created in the project folder
         } catch (AmazonServiceException e) {
             LOG.error("Error {} occurred while uploading file", e.getLocalizedMessage());
         } catch (IOException ex) {
             LOG.error("Error {} occurred while deleting temporary file", ex.getLocalizedMessage());
         }
     }

    @Async
    public void uploadWithFolderNumber(String bucketType, final MultipartFile multipartFile, int folderNumber) {
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            final String fileName = folderNumber + "/" + file.getName();
            LOG.info("Uploading file with name {}", fileName);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(getBucketName(bucketType), fileName, file);
            amazonS3.putObject(putObjectRequest);
            Files.delete(file.toPath()); // Remove the file locally created in the project folder
        } catch (AmazonServiceException e) {
            LOG.error("Error {} occurred while uploading file", e.getLocalizedMessage());
        } catch (IOException ex) {
            LOG.error("Error {} occurred while deleting temporary file", ex.getLocalizedMessage());
        }
    }

    @Async
    public int findNumberOfFolders(String bucketType) {
        ListObjectsV2Request req = new ListObjectsV2Request(); 
        req.setBucketName(getBucketName(bucketType));
        ListObjectsV2Result result;
        int folderCount = 0;
        LOG.info("Counting s3 files");
        do {
            result = amazonS3.listObjectsV2(req);
            for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
                String fileName = objectSummary.getKey();
                int number = Integer.parseInt(fileName.split("/")[0]);
                if (number > folderCount) {
                    folderCount = number;
                }
            }
            req.setContinuationToken(result.getNextContinuationToken());

        } while (result.isTruncated());
        return folderCount;
    }

    public String getFileURL(String bucketType, String objectKey) {
        // Set the presigned URL to expire after one hour.
        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = Instant.now().toEpochMilli();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);

        // Generate the presigned URL.
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(getBucketName(bucketType), objectKey)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);
        URL url = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);
        return url.toString();
    }

}