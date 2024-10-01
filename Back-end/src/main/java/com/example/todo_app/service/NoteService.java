package com.example.todo_app.service;

import com.example.todo_app.dto.request.NoteSpec;
import com.example.todo_app.dto.response.ApiResponse;
import com.example.todo_app.dto.request.NoteRequest;
import com.example.todo_app.dto.response.NoteResponse;
import com.example.todo_app.dto.response.PaginationResponse;
import com.example.todo_app.entity.Note;
import com.example.todo_app.entity.User;
import com.example.todo_app.exception.AppException;
import com.example.todo_app.exception.ErrorCode;
import com.example.todo_app.mapper.NoteMapper;
import com.example.todo_app.repository.NoteRepository;
import com.example.todo_app.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class NoteService {
    NoteRepository noteRepository;
    UserRepository userRepository;
    NoteMapper noteMapper;
    FirebaseService firebaseService;


    public NoteResponse createNote(String title, String content, MultipartFile file, String username
    ) throws IOException, InterruptedException {
        System.out.println("Zo đây nà");
        String imageBaseUrl = "https://firebasestorage.googleapis.com/v0/b/pushnotification-57e0c.appspot.com/o/";
        Note note = new Note();
        note.setTitle(title);
        note.setContent(content);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        note.setUser(user);
        String stringRandom = randomString();
        firebaseService.upload(file, username.concat(stringRandom));
        String url = imageBaseUrl + username.concat(stringRandom);
        note.setImageURL(getImageUrl(url));
        System.out.println("Image Url " + note.getImageURL());
        note = noteRepository.save(note);

        return noteMapper.toNoteResponse(note);
    }

    public NoteResponse updateNote(String username, String noteId, String content, String title) {
       Note note = noteRepository.findById(noteId).orElseThrow(()-> new AppException(ErrorCode.INVALID_CONTENT_NOTE));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        note.setUser(user);
        note.setContent(content);
        note.setTitle(title);
        note = noteRepository.save(note);

        return noteMapper.toNoteResponse(note);
    }
    public void deleteNote(String noteId){
        noteRepository.deleteById(noteId);
    }

    public ApiResponse<List<NoteResponse>> getAllNotes(Integer pageNumber, Integer pageSize,
                                                    String sortBy, String dir) {
        log.info("In method get Notes");

        Sort sort = dir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber-1, pageSize, sort);
        Page<Note> notePages = noteRepository.findAll(pageable);
        List<Note> notes = notePages.getContent();
        List<NoteResponse> notesResponse = new ArrayList<>();
        for(Note note : notes) {
            notesResponse.add(noteMapper.toNoteResponse(note));
        }
        return ApiResponse.<List<NoteResponse>>builder()
                .result(notesResponse)
                .pagination(new PaginationResponse(pageNumber, pageSize, notePages.getTotalElements(), notePages.getTotalPages()))
                .build();
    }

    public ApiResponse<List<NoteResponse>> getAllNoteByCriteria(String title, Integer pageNumber, Integer pageSize,
                                                          String sortBy, String dir, String userId) {
        System.out.println("userId"+ userId);
        Sort sort = dir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber-1, pageSize, sort);
        Specification<Note> spec = Specification.where(null);

        if (userId != null) {
            spec = spec.and(NoteSpec.hasUser(userId));
        }

        if (!title.isEmpty()) {
            spec = spec.and(NoteSpec.hasTitle(title));
        }
        Page<Note> notePages = noteRepository.findAll(spec, pageable);
        List<Note> notes = notePages.getContent();
        List<NoteResponse> notesResponse = new ArrayList<>();
        for(Note note : notes) {
            notesResponse.add(noteMapper.toNoteResponse(note));
        }
        return ApiResponse.<List<NoteResponse>>builder()
                .result(notesResponse)
                .pagination(new PaginationResponse(pageNumber, pageSize, notePages.getTotalElements(), notePages.getTotalPages()))
                .build();

    }
    public String getImageUrl(String baseUrl) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        String jsonResponse = response.body();
        System.out.println("data, "+jsonResponse);
        JsonNode node = new ObjectMapper().readTree(jsonResponse);
        String imageToken = node.get("downloadTokens").asText();
        return baseUrl + "?alt=media&token=" + imageToken;
    }
    public String randomString() {
        byte[] array = new byte[7]; // length is bounded by 7
        new Random().nextBytes(array);
        String generatedString = new String(array, StandardCharsets.UTF_8);

        return generatedString;
    }
}
