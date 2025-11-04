package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.dto.GeneroDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Genero;

public interface GeneroRepository extends JpaRepository<Genero, Integer>{

	@Query(value="SELECT g FROM Genero g ORDER BY g.nombre")
	List<Genero> buscarGenerosPorOrdenAlfabetico();
	
	@Query(value = "SELECT NEW com.atrium.gobooks.dto.GeneroDTO(g.id,g.nombre, COUNT(l.genero.nombre)) AS numeroLibros FROM "
			+ "Genero g LEFT JOIN Libro l ON g.id=l.genero.id GROUP BY g.id ORDER BY g.nombre")
	List<GeneroDTO> numeroLibrosGenero();
	
	@Query(value="SELECT g FROM Genero g WHERE g.nombre LIKE :nombre")
	Genero findByName(String nombre);
	
	
	
}
