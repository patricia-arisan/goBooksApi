package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.entities.Genero;

public interface GeneroRepository extends JpaRepository<Genero, Integer>{

	@Query(value="SELECT g FROM Genero g ORDER BY g.nombre")
	List<Genero> buscarGenerosPorOrdenAlfabetico();
	
}
