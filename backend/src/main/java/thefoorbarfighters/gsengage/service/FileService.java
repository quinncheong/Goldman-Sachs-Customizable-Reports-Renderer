package thefoorbarfighters.gsengage.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.xspec.L;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// import software.amazon.awssdk.core.sync.RequestBody;
// import software.amazon.awssdk.services.s3.S3Client;
// import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.time.Instant;
import java.time.LocalDateTime;

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

    // @Async annotation ensures that the method is executed in a different thread

    @Async // download file by name
    public S3ObjectInputStream downloadFile(String fileName) {
        LOG.info("Downloading file with name {}", fileName);
        return amazonS3.getObject(s3DataBucketName, fileName).getObjectContent();
    }

     @Async // save file without file number
     public void upload(final MultipartFile multipartFile) {
         try {
             final File file = convertMultiPartFileToFile(multipartFile);
             int folderCount = this.findNumberOfFolders();
             folderCount++;
             final String fileName = folderCount + "/" + file.getName();
             LOG.info("Uploading file with name {}", fileName);
             final PutObjectRequest putObjectRequest = new PutObjectRequest(s3DataBucketName, fileName, file);
             amazonS3.putObject(putObjectRequest);
             Files.delete(file.toPath()); // Remove the file locally created in the project folder
         } catch (AmazonServiceException e) {
             LOG.error("Error {} occurred while uploading file", e.getLocalizedMessage());
         } catch (IOException ex) {
             LOG.error("Error {} occurred while deleting temporary file", ex.getLocalizedMessage());
         }
     }

    @Async
    public void uploadWithFolderNumber(final MultipartFile multipartFile, int folderNumber) {
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            final String fileName = folderNumber + "/" + file.getName();
            LOG.info("Uploading file with name {}", fileName);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(s3DataBucketName, fileName, file);
            amazonS3.putObject(putObjectRequest);
            Files.delete(file.toPath()); // Remove the file locally created in the project folder
        } catch (AmazonServiceException e) {
            LOG.error("Error {} occurred while uploading file", e.getLocalizedMessage());
        } catch (IOException ex) {
            LOG.error("Error {} occurred while deleting temporary file", ex.getLocalizedMessage());
        }
    }

    @Async
    public int findNumberOfFolders() {
        ListObjectsV2Request req = new ListObjectsV2Request(); 
        req.setBucketName(s3DataBucketName);
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

        } while (result.isTruncated() == true);
        return folderCount;
    }

    public String getFileURL(String objectKey) {
        // Set the presigned URL to expire after one hour.
        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = Instant.now().toEpochMilli();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);

        // Generate the presigned URL.
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(s3DataBucketName, objectKey)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);
        URL url = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);
        return url.toString();
    }

}