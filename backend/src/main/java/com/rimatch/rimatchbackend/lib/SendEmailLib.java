package com.rimatch.rimatchbackend.lib;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.infobip.ApiClient;
import com.infobip.ApiException;
import com.infobip.ApiKey;
import com.infobip.BaseUrl;
import com.infobip.api.EmailApi;

@Component
public class SendEmailLib {

  @Value("${infobip.api-key}")
  private String API_KEY;

  @Value("${infobip.base-url}")
  private String BASE_URL;

  // Sender email address must be verified on the infobip portal for your account
  @Value("${infobip.sender-email}")
  private String SENDER_EMAIL_ADDRESS;

  private String getSenderEmail() {
    return String.format("RiMatchApp <%s>", SENDER_EMAIL_ADDRESS);
  }

  public void sendEmail(List<String> recepientEmailAddress, String subject, String text) throws ApiException {
    var sendEmailApi = initEmailApi();
    try {
      var emailResponse = sendEmailApi.sendEmail(recepientEmailAddress)
          .from(getSenderEmail())
          .subject(subject)
          .text(text)
          .execute();

      System.out.println("Response body: " + emailResponse);

      var reportsResponse = sendEmailApi.getEmailDeliveryReports().execute();
      System.out.println(reportsResponse.getResults());
    } catch (ApiException e) {
      System.out.println("HTTP status code: " + e.responseStatusCode());
      System.out.println("Response body: " + e.rawResponseBody());
      throw e;
    }
  }



  private EmailApi initEmailApi() {
    var apiClient = ApiClient.forApiKey(ApiKey.from(API_KEY)).withBaseUrl(BaseUrl.from(BASE_URL)).build();

    return new EmailApi(apiClient);
  }
}
