package com.web.repository;

import com.web.entity.Category;
import com.web.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact,Long> {

    @Query("select c from Contact c where c.read = false")
    List<Contact> contactNotRead();
}
