package com.rimatch.rimatchbackend.service;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Uri;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file) throws Exception {
        String fileName = generateFileName(file);
        try {

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
        } catch (IOException e) {
            throw new Exception("Could not store file " + fileName + ". Please try again!");
        }
        GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        return s3Client.utilities().getUrl(getUrlRequest).toString();
    }

    public void removeImage(String imageUrl) {
        String fileName = null;
        try {
            fileName = getObjectFromURL(imageUrl);
        } catch (IllegalArgumentException e) {
            // Old images are stored as base64 strings, so getting the object from URL will fail
            // and we can ignore that exception
            return;
        }
        removeFile(fileName);
    }

    public void removeFile(String fileName) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            throw new RuntimeException("Could not delete file " + fileName + ". Please try again!");
        }
    }

    private File convertMultiPartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        multipartFile.transferTo(file);
        return file;
    }

    private String generateFileName(MultipartFile multiPart) {
        String encodedFileName = URLEncoder.encode(multiPart.getOriginalFilename(), StandardCharsets.UTF_8);
        return new Date().getTime() + "-" + encodedFileName;
    }

    public String getObjectFromURL(String objectURL) {
        URI objectUri = URI.create(objectURL);
        S3Uri s3Uri = s3Client.utilities().parseUri(objectUri);
        return s3Uri.key().orElseThrow(() -> new RuntimeException("Could not parse key from URL"));
    }
}
