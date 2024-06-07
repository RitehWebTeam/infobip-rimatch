package com.rimatch.rimatchbackend.model;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

@Data
@AllArgsConstructor
public class Preferences {
    @Min(value = 18,message = "This field cannot be less then 18!")
    @Max(value = 99,message = "This field cannot be more then 99! I guess?")
    private Integer ageGroupMin;

    @Min(value = 18,message = "This field cannot be less then 18!")
    @Max(value = 99,message = "This field cannot be more then 99! I guess?")
    private Integer ageGroupMax;

    private Character partnerGender;

}

