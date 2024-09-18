package com.example.todo_app.dto.response;

import com.example.todo_app.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NoteResponse {
    String id;
    String content;
    User user;
}
