package com.web.api;

import com.web.entity.Banner;
import com.web.entity.Contact;
import com.web.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class ContactApi {

    @Autowired
    ContactRepository contactRepository;

    @GetMapping("/admin/find-all")
    public ResponseEntity<?> findAll(){
        List<Contact> banners = contactRepository.findAll();
        return new ResponseEntity<>(banners, HttpStatus.OK);
    }

    @GetMapping("/admin/not-read")
    public ResponseEntity<?> contactNotRead(){
        List<Contact> banners = contactRepository.contactNotRead();
        return new ResponseEntity<>(banners, HttpStatus.OK);
    }

    @PostMapping("/admin/read-accept")
    public ResponseEntity<?> save(@RequestParam Long id){
        Contact contact = contactRepository.findById(id).get();
        contact.setRead(true);
        contactRepository.save(contact);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/public/create")
    public ResponseEntity<?> save(@RequestBody Contact contact){
        contact.setRead(false);
        contact.setCreatedDate(LocalDate.now());
        Contact result = contactRepository.save(contact);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
}
