package com.atrium.gobooks.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.entities.Libro;

public interface LecturaRepository extends JpaRepository<Lectura, Integer>{
	
	@Query(value="SELECT le FROM Lectura le, Libro li, Usuario u WHERE li.id=le.libro.id AND "
			+ "li.id=:idLibro AND u.id=le.usuario.id AND u.id=:idUsuario")
	Optional <Lectura> buscarLecturaUsuario(Integer idLibro, Integer idUsuario);
	
//	@Query(value="SELECT l FROM Lectura l, Libro l, Usuario u WHERE l.id=l.libro.id AND "
//			+ "l.id=:id AND u.id=l.usuario.id AND u.id=:id")
//	Optional <Lectura> buscarLecturaUsuario(Integer idLibro, Integer idUsuario);
	
//	@Query(value="SELECT l FROM Lectura l ORDER BY l.id")
//	List<Lectura> buscarLibrosPorOrdenAlfabetico();
	
	//Query buscar libros por genero id
//		@Query(value="SELECT l FROM Libro l, Genero g WHERE g.id=l.genero.id AND g.id=:id")
//		List<Libro> buscarLibrosPorGeneroId(Integer id);


}
