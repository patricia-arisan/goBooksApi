package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.dto.EditorialDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Editorial;

public interface EditorialRepository extends JpaRepository<Editorial,Integer>{
	
	@Query(value="SELECT e FROM Editorial e ORDER BY e.nombre")
	List<Editorial> buscarEditorialesPorOrdenAlfabetico();
	
	@Query(value = "SELECT NEW com.atrium.gobooks.dto.EditorialDTO(e.id,e.nombre, COUNT(l.editorial.nombre)) AS numeroLibros FROM "
			+ "Editorial e LEFT JOIN Libro l ON e.id=l.editorial.id GROUP BY e.id ORDER BY e.nombre")
	List<EditorialDTO> numeroLibrosEditorial();
	
	@Query(value="SELECT e FROM Editorial e WHERE e.nombre LIKE :nombre")
	Editorial findByName(String nombre);


}
