package com.example.todo_app.controller;

import com.example.todo_app.dto.response.ApiResponse;
import com.example.todo_app.dto.request.RoleRequest;
import com.example.todo_app.dto.response.RoleResponse;
import com.example.todo_app.service.RoleService;
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
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Tag(name = "Role Controller")
public class RoleController {
    RoleService roleService;

    @Operation(method = "POST",
            summary = "Create a new role",
            description = "Send a request via this API to create new role",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    ApiResponse<RoleResponse> create(@RequestBody RoleRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.create(request))
                .build();
    }

    @Operation(method = "GET",
            summary = "Get list roles",
            description = "Send a request via this API to get list of roles",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    ApiResponse<List<RoleResponse>> getAll() {
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getAll())
                .build();
    }

    @Operation(method = "DELETE",
            summary = "Delete role",
            description = "Send a request via this API to delete role",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{role}")
    ApiResponse<Void> delete(@PathVariable String role) {
        roleService.delete(role);
        return ApiResponse.<Void>builder().build();
    }
}
