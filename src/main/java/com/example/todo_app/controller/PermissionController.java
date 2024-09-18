package com.example.todo_app.controller;

import com.example.todo_app.dto.response.ApiResponse;
import com.example.todo_app.dto.request.PermissionRequest;
import com.example.todo_app.dto.response.PermissionResponse;
import com.example.todo_app.service.PermissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Tag(name = "Permission Controller")
public class PermissionController {
    PermissionService permissionService;

    @Operation(method = "POST",
            summary = "Create a new permission",
            description = "Send a request via this API to create new permission",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PostMapping
    ApiResponse<PermissionResponse> create(@RequestBody PermissionRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.create(request))
                .build();
    }

    @Operation(method = "GET",
            summary = "Get list permission",
            description = "Send a request via this API to get list permissions",
            security = { @SecurityRequirement(name = "bearer-key") })
    @GetMapping
    ApiResponse<List<PermissionResponse>> getAll() {
        return ApiResponse.<List<PermissionResponse>>builder()
                .result(permissionService.getAll())
                .build();
    }

    @Operation(method = "DELETE",
            summary = "Delete permission",
            description = "Send a request via this API to delete permissions",
            security = { @SecurityRequirement(name = "bearer-key") })
    @DeleteMapping("/{permission}")
    ApiResponse<Void> delete(@PathVariable String permission) {
        permissionService.delete(permission);
        return ApiResponse.<Void>builder().build();
    }
}
