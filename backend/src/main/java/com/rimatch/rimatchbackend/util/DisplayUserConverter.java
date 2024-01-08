package com.rimatch.rimatchbackend.util;

import com.rimatch.rimatchbackend.dto.DisplayUserDto;
import com.rimatch.rimatchbackend.model.User;

import java.util.List;
import java.util.stream.Collectors;

public class DisplayUserConverter {

    public static DisplayUserDto convertToDto(User user) {
        DisplayUserDto displayUserDto = new DisplayUserDto();
        displayUserDto.setId(user.getId());
        displayUserDto.setFirstName(user.getFirstName());
        displayUserDto.setLastName(user.getLastName());
        displayUserDto.setDescription(user.getDescription());
        displayUserDto.setProfileImageUrl(user.getProfileImageUrl());
        displayUserDto.setLocation(user.getLocation());
        displayUserDto.setGender(user.getGender());

        return displayUserDto;
    }

    public static List<DisplayUserDto> convertToDtoList(List<User> users) {
        return users.stream()
                .map(DisplayUserConverter::convertToDto)
                .collect(Collectors.toList());
    }
}
