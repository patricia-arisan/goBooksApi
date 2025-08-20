package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.entities.Libro;

public interface LibroRepository extends JpaRepository<Libro, Integer>{
	
	@Query(value="SELECT l FROM Libro l ORDER BY l.nombre")
	List<Libro> buscarLibrosPorOrdenAlfabetico();
	
	@Query(value="SELECT l FROM Libro l, Genero g WHERE g.id=l.genero.id AND g.id=:id")
	List<Libro> buscarLibrosPorGeneroId(Integer id);
	
	@Query(value="SELECT l FROM Libro l ORDER BY l.id DESC LIMIT 4")
	List<Libro> buscarUltimosLibrosIncorporados();
	
	@Query(value="SELECT l, AVG(le.puntuacion) AS media FROM Lectura le, Libro l WHERE l.id=le.libro.id GROUP BY l.id "
			+ "ORDER BY media DESC")
	List <Libro> listaLibrosMayorPuntuacion();
	
	@Query(value="SELECT l, AVG(le.puntuacion) AS media FROM Lectura le, Libro l WHERE l.id=le.libro.id GROUP BY l.id "
			+ "ORDER BY media DESC LIMIT 4")
	List <Libro> librosMayorPuntuacion();
	
	@Query(value="SELECT l FROM Libro l WHERE l.nombre like %:clave% "
			+ "or l.autor.nombre like %:clave% "
			+ "or l.editorial.nombre like %:clave% "
			+ "or l.isbn like %:clave%")
	List<Libro> buscarLibro (String clave);
	
	/////
//	@Query(value="SELECT l FROM Libro l ORDER BY (SELECT AVG(puntuacion) FROM Lectura le, "
//			+ "Libro l WHERE l.id=le.libro.id) DESC NULLS LAST")
//	List <Libro> listaLibrosMayorPuntuacion();
	
	
//	@Query(value="SELECT l FROM Libro l ORDER BY "
//			+ "(SELECT AVG(puntuacion) AS media FROM Lectura le, Libro l WHERE l.id=le.libro.id ORDER BY media DESC) ASC")
//	List <Libro> listaLibrosMayorPuntuacion();
//	@Query(value="SELECT l, (SELECT AVG(puntuacion) FROM Lectura le, Libro l WHERE l.id=le.libro.id) AS media FROM Libro l "
//			+ " ORDER BY media DESC")
//	List <Libro> listaLibrosMayorPuntuacion();
//	@Query(value="SELECT l FROM Libro l GROUP BY l.id ORDER BY "
//			+ "(SELECT AVG(puntuacion) AS media FROM Lectura le, Libro l "
//			+ "WHERE l.id=le.libro.id GROUP BY le.libro.id ORDER BY media DESC) ASC")
//	List <Libro> listaLibrosMayorPuntuacion();
//	@Query(value="SELECT le.libro.id, AVG(le.puntuacion) AS media FROM Lectura le, Libro l WHERE "
//			+ "l.id=le.libro.id GROUP BY l.id ORDER BY media DESC")
//	List <Libro> listaLibrosMayorPuntuacion();
	///////SELECT le.libro_id, AVG(lectura_puntuacion) AS media FROM Lectura le, Libro l 
	///WHERE l.libro_id=le.libro_id GROUP BY l.libro_id ORDER BY media DESC;
	///SELECT le.libro_id, AVG(lectura_puntuacion) AS media FROM Lectura le, Libro l WHERE l.libro_id=le.libro_id 
	///GROUP BY l.libro_id ORDER BY media DESC;
	
}
