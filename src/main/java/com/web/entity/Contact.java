package com.web.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "contact")
@Getter
@Setter
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String phone;

    private String fullName;

    private String email;

    private String content;

    @Column(name = "is_read")
    private Boolean read;

    private LocalDate createdDate;
}
