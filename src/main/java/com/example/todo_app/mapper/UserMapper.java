package com.example.todo_app.mapper;

import com.example.todo_app.dto.request.UserCreationRequest;
import com.example.todo_app.dto.request.UserUpdateRequest;
import com.example.todo_app.dto.response.UserResponse;
import com.example.todo_app.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
