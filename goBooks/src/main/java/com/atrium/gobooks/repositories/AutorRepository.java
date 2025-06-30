package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.entities.Autor;

public interface AutorRepository extends JpaRepository<Autor, Integer>{
	
	@Query(value="SELECT a FROM Autor a ORDER BY a.nombre")
	List<Autor> buscarAutoresPorOrdenAlfabetico(); 

}
