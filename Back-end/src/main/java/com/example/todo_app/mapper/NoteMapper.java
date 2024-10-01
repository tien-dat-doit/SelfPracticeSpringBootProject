package com.example.todo_app.mapper;

import com.example.todo_app.dto.request.NoteRequest;
import com.example.todo_app.dto.response.NoteResponse;
import com.example.todo_app.entity.Note;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NoteMapper {
//    Note toNote(NoteRequest request);
    NoteResponse toNoteResponse(Note note);
}
