package com.web.api;

import com.web.entity.Banner;
import com.web.entity.Category;
import com.web.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/banner")
@CrossOrigin
public class BannerApi {

    @Autowired
    private BannerRepository bannerRepository;

    @GetMapping("/public/find-all")
    public ResponseEntity<?> search(){
        List<Banner> banners = bannerRepository.findAll();
        return new ResponseEntity<>(banners,HttpStatus.OK);
    }

    @GetMapping("/public/find-by-page")
    public ResponseEntity<?> findByType(@RequestParam(value = "page") String page){
        List<Banner> banners = bannerRepository.findByPageName(page);
        return new ResponseEntity<>(banners,HttpStatus.OK);
    }

    @PostMapping("/admin/create-update")
    public ResponseEntity<?> save(@RequestBody Banner banner){
        Banner result = bannerRepository.save(banner);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        bannerRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/admin/findById")
    public ResponseEntity<?> findById(@RequestParam("id") Long id){
        Banner result = bannerRepository.findById(id).get();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
