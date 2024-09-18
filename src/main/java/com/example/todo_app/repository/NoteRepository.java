package com.example.todo_app.repository;

import com.example.todo_app.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, String> {
}
