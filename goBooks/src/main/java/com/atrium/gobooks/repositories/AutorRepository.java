package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.entities.Autor;

public interface AutorRepository extends JpaRepository<Autor, Integer> {

	@Query(value = "SELECT a FROM Autor a ORDER BY a.nombre")
	List<Autor> buscarAutoresPorOrdenAlfabetico();

	@Query(value = "SELECT NEW com.atrium.gobooks.dto.AutorDTO(a.id,a.nombre, COUNT(l.autor.nombre)) as numeroLibros FROM "
			+ "Autor a LEFT JOIN Libro l ON a.id=l.autor.id GROUP BY a.id ORDER BY a.nombre")
	List<AutorDTO> numeroLibrosAutor();
//	@Query(value = "SELECT NEW com.atrium.gobooks.dto.AutorDTO(a.id,a.nombre, COUNT(*)) as numeroLibros FROM Libro l, "
//			+ "Autor a WHERE l.autor.id=a.id GROUP BY l.autor.id ORDER BY a.nombre") inner join, solo cuenta los que tienen libro
	//FROM Autor a LEFT JOIN a.libros l GROUP BY a.id, a.nombre ORDER BY a.nombre"
	//LEFT JOIN para contar autores sin libro, hay que usar count l.autor.nombre (sin esto cuenta a todos minimo una vez)
}