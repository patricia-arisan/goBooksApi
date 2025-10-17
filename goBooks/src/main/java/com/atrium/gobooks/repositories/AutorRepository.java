package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Libro;

public interface AutorRepository extends JpaRepository<Autor, Integer>{
	
	
	
	@Query(value="SELECT a FROM Autor a ORDER BY a.nombre")
	List<Autor> buscarAutoresPorOrdenAlfabetico(); 
	
//	@Query(value="SELECT l.autor, COUNT(l) as numero FROM Libro l GROUP BY l.autor ORDER BY l.autor")
//	List<Autor> numeroLibrosAutores();
	@Query(value="SELECT l.autor, COUNT(*) AS numeroLibros FROM Libro l,Autor a WHERE l.autor.id=a.id GROUP BY l.autor ORDER BY l.autor")
	
	List<Autor> numeroLibrosAutores();
	
//	@Query(value="SELECT a.nombre, COUNT(a) as numeroLibros FROM Autor a GROUP BY autor.id ORDER BY a.nombre")
//	List<AutorDTO> numeroLibrosAutor();
	
//	@Query(value="SELECT a.nombre, COUNT(*) as numeroLibros FROM Libro l, Autor a WHERE l.autor.id=a.id GROUP BY l.autor.id ORDER BY a.nombre")
//	List<AutorDTO> numeroLibrosAutor();
//	@Query(value="SELECT NEW com.atrium.gobooks.dto.AutorDTO(a.id,a.nombre, COUNT(a.nombre)) AS numeroLibros FROM Autor a GROUP BY a.nombre ORDER BY COUNT(a.nombre)")
	@Query(value="SELECT NEW com.atrium.gobooks.dto.AutorDTO(a.id,a.nombre, COUNT(*)) as numeroLibros FROM Libro l, "
			+ "Autor a WHERE l.autor.id=a.id GROUP BY l.autor.id ORDER BY a.nombre")
	//mejorada?? SELECT NEW com.atrium.gobooks.dto.AutorDTO(a.nombre, COUNT(l)) FROM Libro l JOIN l.autor a GROUP BY a.id, a.nombre ORDER BY a.nombre
	List<AutorDTO> numeroLibrosAutor();
		//com.atrium.gobooks.dto.AutorDTO
//	SELECT a.autor_nombre, COUNT(*) FROM Libro l, Autor a WHERE l.autor_id=a.autor_id GROUP BY l.autor_id ORDER BY a.autor_nombre;
//SELECT a.autorNombre, COUNT(l) FROM Libro l JOIN l.autor a GROUP BY a.autorId ORDER BY a.autorNombre
	//SELECT a.autor_nombre, a.autor_id, COUNT(*) as numeroLibros FROM Libro l, Autor a WHERE l.autor_id=a.autor_id GROUP BY l.autor_id ORDER BY a.autor_nombre;
}
