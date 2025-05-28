package com.atrium.gobooks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atrium.gobooks.entities.Libro;

public interface LibroReository extends JpaRepository<Libro, Integer>{

}
