package com.rimatch.rimatchbackend.dto;

import com.rimatch.rimatchbackend.model.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Data
public class DisplayUserDto {

    private String id;

    private String firstName;

    private String lastName;

    private String description;

    private String profileImageUrl;

    private String location;

    private Character gender;

    private Integer age;

    private String favouriteSong;

    private List<String> tags = new ArrayList<>();

    private List<String> photos = new ArrayList<>();

    private String chatId;

    public static DisplayUserDto fromUser(User user){
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(user, DisplayUserDto.class);
    }

}
