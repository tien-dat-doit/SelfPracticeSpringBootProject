package com.example.todo_app.dto.request;

import com.example.todo_app.entity.Note;
import org.springframework.data.jpa.domain.Specification;

public class NoteSpec {
    public static Specification<Note> hasTitle(String title){
        return ((root, query, criteriaBuilder) ->
            criteriaBuilder.like(criteriaBuilder.lower(root.get("title")),"%"+title+"%")
        );
    }

    public static Specification<Note> hasUser(String userId){
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("user").get("id"), userId)
        );
    }
}
