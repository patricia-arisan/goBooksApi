package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.entities.Libro;

public interface LibroRepository extends JpaRepository<Libro, Integer>{
	
	@Query(value="SELECT l FROM Libro l ORDER BY l.nombre")
	List<Libro> buscarLibrosPorOrdenAlfabetico();

}
