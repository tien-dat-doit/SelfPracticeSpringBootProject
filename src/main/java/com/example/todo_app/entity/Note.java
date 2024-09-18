package com.example.todo_app.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    //Annotation @Lob means that annouce to JPA this is use Long text to store in DB
    @Lob
    private String content;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}