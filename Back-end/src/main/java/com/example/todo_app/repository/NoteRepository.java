package com.example.todo_app.repository;

import com.example.todo_app.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, String>, JpaSpecificationExecutor<Note> {
    List<Note> findByuserId(String userId);
}
