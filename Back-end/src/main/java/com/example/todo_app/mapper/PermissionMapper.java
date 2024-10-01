package com.example.todo_app.mapper;

import com.example.todo_app.dto.request.PermissionRequest;
import com.example.todo_app.dto.response.PermissionResponse;
import com.example.todo_app.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
