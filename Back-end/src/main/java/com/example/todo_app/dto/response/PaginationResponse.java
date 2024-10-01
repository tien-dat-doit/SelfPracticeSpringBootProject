package com.example.todo_app.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaginationResponse {
    int pageNumber;
    int pageSize;
    Long totalItem;
    int totalPage;
}
