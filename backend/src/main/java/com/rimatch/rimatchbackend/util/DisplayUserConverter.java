package com.rimatch.rimatchbackend.util;

import com.rimatch.rimatchbackend.dto.DisplayUserDto;
import com.rimatch.rimatchbackend.model.User;

import java.util.List;
import java.util.stream.Collectors;

public class DisplayUserConverter {

    public static DisplayUserDto convertToDto(User user) {
        return DisplayUserDto.fromUser(user);
    }

    public static List<DisplayUserDto> convertToDtoList(List<User> users) {
        return users.stream()
                .map(DisplayUserConverter::convertToDto)
                .collect(Collectors.toList());
    }

}
