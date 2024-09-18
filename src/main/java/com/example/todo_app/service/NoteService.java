package com.example.todo_app.service;

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
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class NoteService {
    NoteRepository noteRepository;
    UserRepository userRepository;
    NoteMapper noteMapper;

    public NoteResponse createNote(NoteRequest request, String username) {
        Note note = noteMapper.toNote(request);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        note.setUser(user);
        note = noteRepository.save(note);

        return noteMapper.toNoteResponse(note);
    }

    public NoteResponse updateNote(String username, String noteId, String content) {
       Note note = noteRepository.findById(noteId).orElseThrow(()-> new AppException(ErrorCode.INVALID_CONTENT_NOTE));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        note.setUser(user);
        note.setContent(content);
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
}
