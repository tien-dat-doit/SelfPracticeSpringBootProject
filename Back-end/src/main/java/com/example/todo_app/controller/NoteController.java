package com.example.todo_app.controller;

import com.example.todo_app.constant.PredefinedPagination;
import com.example.todo_app.dto.request.UserUpdateRequest;
import com.example.todo_app.dto.response.ApiResponse;
import com.example.todo_app.dto.request.NoteRequest;
import com.example.todo_app.dto.response.NoteResponse;
import com.example.todo_app.dto.response.UserResponse;
import com.example.todo_app.entity.User;
import com.example.todo_app.exception.AppException;
import com.example.todo_app.exception.ErrorCode;
import com.example.todo_app.service.NoteService;
import com.example.todo_app.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Tag(name = "Note Controller")
public class NoteController {
    NoteService noteService;
    UserService userService;

    @Operation(method = "POST",
            summary = "Create a new note",
            description = "Send a request via this API to create new note",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    ApiResponse<NoteResponse> create(  @RequestParam("title") String title,
                                       @RequestParam("content") String content,
                                      @RequestParam("file") MultipartFile file) throws IOException, InterruptedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Map<String, Object> claims = ((Jwt) principal).getClaims();
        System.out.println(claims.get("sub"));
        return ApiResponse.<NoteResponse>builder()
                .result(noteService.createNote(title, content, file, claims.get("sub").toString()))
                .build();
    }

    @Operation(method = "GET",
            summary = "Get list notes",
            description = "Send a request via this API to get list of notes",
            security = { @SecurityRequirement(name = "bearer-key") })
    @GetMapping
    ApiResponse<List<NoteResponse>> getAll(
            @RequestParam(defaultValue = "", required = false) String title,
            @RequestParam(defaultValue = "", required = false) String userId,
            @RequestParam(defaultValue = PredefinedPagination.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(defaultValue = PredefinedPagination.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(defaultValue = PredefinedPagination.SORT_BY, required = false) String sortBy,
            @RequestParam(defaultValue = PredefinedPagination.SORT_DIR, required = false) String sortType
    ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Map<String, Object> claims = ((Jwt) principal).getClaims();
        String userName = claims.get("sub").toString();
        User user = userService.getUserByName(userName);
        if(pageNumber < 1) {
            throw  new AppException(ErrorCode.INVALID_FILTER_PAGINATION);
        }

        return noteService.getAllNoteByCriteria(title, pageNumber, pageSize, sortBy, sortType, userId.isEmpty() ? user.getId() : userId);
    }

    @Operation(method = "DELETE",
            summary = "Delete a user",
            description = "Send a request via this API to delete a user",
            security = { @SecurityRequirement(name = "bearer-key") })
    @DeleteMapping("/{noteId}")
    ApiResponse<String> deleteUser(@PathVariable String noteId) {
        noteService.deleteNote(noteId);
        return ApiResponse.<String>builder().result("Note has been deleted").build();
    }

    @Operation(method = "PUT",
            summary = "Update user by id",
            description = "Send a request via this API to update user by id",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PutMapping("/{noteId}")
    ApiResponse<NoteResponse> updateUser(@PathVariable("noteId") String noteId,@RequestBody NoteRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Map<String, Object> claims = ((Jwt) principal).getClaims();
        return ApiResponse.<NoteResponse>builder()
                .result(noteService.updateNote(claims.get("sub").toString(),noteId, request.getContent(), request.getTitle()))
                .build();
    }
}
