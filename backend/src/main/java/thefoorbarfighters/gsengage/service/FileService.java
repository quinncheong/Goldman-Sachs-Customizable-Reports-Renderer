package thefoorbarfighters.gsengage;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.dynamodbv2.xspec.L;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3ObjectSummary;

// import software.amazon.awssdk.core.sync.RequestBody;
// import software.amazon.awssdk.services.s3.S3Client;
// import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;

@Service
public class FileService {

    private static final Logger LOG = LoggerFactory.getLogger(FileService.class);

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${s3.bucket.name}")
    private String s3BucketName;

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

    @Async
    public S3ObjectInputStream findByName(String fileName) {
        LOG.info("Downloading file with name {}", fileName);
        return amazonS3.getObject(s3BucketName, fileName).getObjectContent();
    }

    // @Async
    // public void save(final MultipartFile multipartFile) {
    //     try {
    //         final File file = convertMultiPartFileToFile(multipartFile);
    //         final String fileName = LocalDateTime.now() + "_" + file.getName();
    //         LOG.info("Uploading file with name {}", fileName);
    //         final PutObjectRequest putObjectRequest = new PutObjectRequest(s3BucketName, fileName, file);
    //         amazonS3.putObject(putObjectRequest);
    //         Files.delete(file.toPath()); // Remove the file locally created in the project folder
    //     } catch (AmazonServiceException e) {
    //         LOG.error("Error {} occurred while uploading file", e.getLocalizedMessage());
    //     } catch (IOException ex) {
    //         LOG.error("Error {} occurred while deleting temporary file", ex.getLocalizedMessage());
    //     }
    // }

    @Async
    public void save(final MultipartFile multipartFile, int fileNumber) {
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            final String fileName = fileNumber + "/" + file.getName();
            LOG.info("Uploading file with name {}", fileName);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(s3BucketName, fileName, file);
            amazonS3.putObject(putObjectRequest);
            Files.delete(file.toPath()); // Remove the file locally created in the project folder
        } catch (AmazonServiceException e) {
            LOG.error("Error {} occurred while uploading file", e.getLocalizedMessage());
        } catch (IOException ex) {
            LOG.error("Error {} occurred while deleting temporary file", ex.getLocalizedMessage());
        }
    }

    @Async
    public int getBucketFileCount() {
        ListObjectsV2Request req = new ListObjectsV2Request(); 
        req.setBucketName(s3BucketName);
        ListObjectsV2Result result;
        int fileCount = 0;
        LOG.info("Counting s3 files");
     
        do {
           result = amazonS3.listObjectsV2(req);
           for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
            String fileName = objectSummary.getKey();
            int number = Integer.parseInt(fileName.split("/")[0]);
            if (number > fileCount) {
                fileCount = number;
            }
           }
           req.setContinuationToken(result.getNextContinuationToken());
     
        } while (result.isTruncated() == true);
            return fileCount;
     }

}