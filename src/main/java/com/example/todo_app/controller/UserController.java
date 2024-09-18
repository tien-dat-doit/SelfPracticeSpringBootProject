package com.example.todo_app.controller;

import com.example.todo_app.dto.response.ApiResponse;
import com.example.todo_app.dto.request.UserCreationRequest;
import com.example.todo_app.dto.request.UserUpdateRequest;
import com.example.todo_app.dto.response.UserResponse;
import com.example.todo_app.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Tag(name = "User Controller")
public class UserController {
    UserService userService;

    @Operation(method = "POST",
            summary = "Create a new user",
            description = "Send a request via this API to create new user",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @Operation(method = "GET",
            summary = "Get list users",
            description = "Send a request via this API to get list of users",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getUsers())
                .build();
    }

    @Operation(method = "GET",
            summary = "Get detail user",
            description = "Send a request via this API to get detail user",
            security = { @SecurityRequirement(name = "bearer-key") })
    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable("userId") String userId) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUser(userId))
                .build();
    }

    @Operation(method = "GET",
            summary = "Get current user info",
            description = "Send a request via this API to get current info of logged in user",
            security = { @SecurityRequirement(name = "bearer-key") })
    @GetMapping("/my-info")
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @Operation(method = "DELETE",
            summary = "Delete a user",
            description = "Send a request via this API to delete a user",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{userId}")
    ApiResponse<String> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ApiResponse.<String>builder().result("User has been deleted").build();
    }

    @Operation(method = "PUT",
            summary = "Update user by id",
            description = "Send a request via this API to update user by id",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PutMapping("/{userId}")
    ApiResponse<UserResponse> updateUser(@PathVariable String userId, @RequestBody UserUpdateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(userId, request))
                .build();
    }
}
