package com.rimatch.rimatchbackend.lib;

import com.infobip.*;
import com.infobip.api.EmailApi;
import com.infobip.api.SmsApi;
import com.infobip.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class InfobipClient {

    @Value("${infobip.api-key}")
    private String API_KEY;

    @Value("${infobip.base-url}")
    private String BASE_URL;

    // Sender email address must be verified on the infobip portal for your account
    @Value("${infobip.sender-email}")
    private String SENDER_EMAIL_ADDRESS;

    @Value("${infobip.phone-number}")
    private String PHONE_NUMBER;

    private String getSenderEmail() {
        return String.format("RiMatchApp <%s>", SENDER_EMAIL_ADDRESS);
    }

    private EmailApi initEmailApi() {
        return new EmailApi(initApiClient());
    }

    private SmsApi initSmsApi(){
        return new SmsApi(initApiClient());
    }

    private ApiClient initApiClient(){
        return ApiClient.forApiKey(ApiKey.from(API_KEY)).withBaseUrl(BaseUrl.from(BASE_URL)).build();
    }

    public void sendSms(String text){

        var smsApi = initSmsApi();

        SmsTextualMessage smsMessage = new SmsTextualMessage()
                .from("InfoSMS")
                .addDestinationsItem(new SmsDestination().to(PHONE_NUMBER))
                .text(text);

        SmsAdvancedTextualRequest smsMessageRequest = new SmsAdvancedTextualRequest()
                .messages(List.of(smsMessage));

        smsApi.sendSmsMessage(smsMessageRequest)
                .executeAsync(new ApiCallback<SmsResponse>() {
                    @Override
                    public void onSuccess(SmsResponse result, int responseStatusCode, Map<String, List<String>> responseHeaders) {

                    }
                    @Override
                    public void onFailure(ApiException exception, int responseStatusCode, Map<String, List<String>> responseHeaders) {
                    }
                });
    }

    public void sendEmail(List<String> recepientEmailAddress, String subject, String text) throws ApiException {
        var sendEmailApi = initEmailApi();
            var emailResponse = sendEmailApi.sendEmail(recepientEmailAddress)
                    .from(getSenderEmail())
                    .subject(subject)
                    .text(text)
                    .executeAsync(new ApiCallback<EmailSendResponse>() {
                        @Override
                        public void onSuccess(EmailSendResponse emailSendResponse, int i, Map<String, List<String>> map) {

                        }

                        @Override
                        public void onFailure(ApiException e, int i, Map<String, List<String>> map) {

                        }
                    });
    }
}
