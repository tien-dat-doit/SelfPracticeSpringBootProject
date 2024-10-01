package com.example.todo_app.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NoteRequest {
    @Size(min = 10, message = "INVALID_CONTENT_NOTE")
    String title;
    @Size(min = 10, message = "INVALID_CONTENT_NOTE")
    String content;
}
