package com.web.repository;

import com.web.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog,Long> {

    @Query("select i from Blog i order by i.id desc")
    public List<Blog> findAllDesc();

    @Query(value = "SELECT i.* from instruct i order by i.id desc limit 1", nativeQuery = true)
    public Optional<Blog> lastInstruct();

    @Query(value = "SELECT i.* from instruct i where i.id != (select max(it.id) from instruct it) order by i.id desc limit 5", nativeQuery = true)
    public List<Blog> getInstructIndex();

    @Query("select i from Blog i where i.title like ?1 or i.description like ?1")
    public Page<Blog> findByParam(String param, Pageable pageable);
}
