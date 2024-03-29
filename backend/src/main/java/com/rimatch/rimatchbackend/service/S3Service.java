package com.rimatch.rimatchbackend.service;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;

@Service
public class S3Service {

    @Autowired
    AmazonS3 s3Client;
    private final String bucketName = "rimatch-images";

    public String uploadFile(MultipartFile file) throws Exception {
        String fileName = generateFileName(file);
        try {
            s3Client.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), new ObjectMetadata())
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new Exception("Could not store file " + fileName + ". Please try again!");
        }
        return s3Client.getUrl(bucketName, fileName).toString();
    }

    /*public String uploadFile(MultipartFile multipartFile) throws IOException {
        File file = convertMultiPartFileToFile(multipartFile);
        String fileName = generateFileName(multipartFile);
        amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file)
                .withCannedAcl(com.amazonaws.services.s3.model.CannedAccessControlList.PublicRead));
        file.delete(); // Delete the temporary file
        return generatePublicUrl(fileName);
    }*/

    private File convertMultiPartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        multipartFile.transferTo(file);
        return file;
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }
}

