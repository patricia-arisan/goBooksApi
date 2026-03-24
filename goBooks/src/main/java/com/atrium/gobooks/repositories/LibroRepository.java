package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.entities.Libro;

/**
 * Repositorio encargado de gestionar la persistencia de datos del Libro
 */
public interface LibroRepository extends JpaRepository<Libro, Integer> {
	/**
	 * Recupera todos los libros de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Libro} ordenados de forma alfabetica
	 */
	@Query(value = "SELECT l FROM Libro l ORDER BY l.nombre")
	List<Libro> buscarLibrosPorOrdenAlfabetico();
	
	/**
	 * Recupera los libros pertenecientes a un mismo genero, ordenados por nombre de la A a la Z 
	 * @param id El id del genero
	 * @return una lista de {@link Libro} del mismo genero ordenados de forma alfabetica
	 */
	@Query(value = "SELECT l FROM Libro l, Genero g WHERE g.id=l.genero.id AND g.id=:id ORDER BY l.nombre")
	List<Libro> buscarLibrosPorGeneroId(Integer id);
	
	/**
	 * Recupera los libros pertenecientes a un mismo autor, ordenados por nombre de la A a la Z
	 * @param id El id del autor
	 * @return una lista de {@link Libro} con el mismo autor ordenados de forma alfabetica
	 */
	@Query(value = "SELECT l FROM Libro l, Autor a WHERE a.id=l.autor.id AND a.id=:id ORDER BY l.nombre")
	List<Libro> buscarLibrosPorAutorId(Integer id);
	
	/**
	 * Recupera los libros pertenecientes a una editorial, ordenados por nombre de la A a la Z
	 * @param id El id de la editorial
	 * @return una lista de {@link Libro} de la misma editorial ordenados de forma alfabetica
	 */
	@Query(value = "SELECT l FROM Libro l, Editorial e WHERE e.id=l.editorial.id AND e.id=:id ORDER BY l.nombre")
	List<Libro> buscarLibrosPorEditorialId(Integer id);
	
	/**
	 * Recupera los cuatro ultimos libros registrados en la bbdd, del mas reciente al menos
	 * @return una lista de los ultimos cuatro {@link Libro} incorporados
	 */
	@Query(value = "SELECT l FROM Libro l ORDER BY l.id DESC LIMIT 4")
	List<Libro> buscarUltimosLibrosIncorporados();
	
	/**
	 * Recupera la lista completa de los ultimos libros registrados, ordenados del mas reciente
	 * al que mas tiempo lleve registrado en la bbdd
	 * @return una lista de los ultimos {@link Libro} incoporados, ordenados cronologicamente
	 */
	@Query(value = "SELECT l FROM Libro l ORDER BY l.id DESC")
	List<Libro> buscarTodosUltimosLibrosIncorporados();
	
	/**
	 * Recupera la lista de libros con su puntuacion media de las lecturas, ordenados 
	 * de la mas alta a la mas baja
	 * @return una lista de {@link Libro} con su media por orden decreciente
	 */
	@Query(value = "SELECT l, AVG(le.puntuacion) AS media FROM Lectura le, Libro l WHERE l.id=le.libro.id GROUP BY l.id "
			+ "HAVING AVG(le.puntuacion) IS NOT NULL ORDER BY media DESC")
	List<Libro> listaLibrosMayorPuntuacion();
	
	/**
	 * Recupera la lista de los cuatro libros con mayor puntuacion de lectura, en orden descendente
	 * @return una lista de {@link Libro} con las cuatro mejores puntuaciones medias de lecturas
	 */
	@Query(value = "SELECT l, AVG(le.puntuacion) AS media FROM Lectura le, Libro l WHERE l.id=le.libro.id GROUP BY l.id "
			+ "HAVING AVG(le.puntuacion) IS NOT NULL ORDER BY media DESC LIMIT 4")
	List<Libro> librosMayorPuntuacion();
	
	/**
	 * Busqueda de libros por nombre del libro, autor, editorial o isbn en la bbdd
	 * @param clave La palabra clave ingresada y enviada en la peticion
	 * @return una lista de {@link Libro} que contengan coincidencias con esa palabra clave
	 * en alguno de sus campos definidos en la busqueda
	 */
	@Query(value = "SELECT l FROM Libro l WHERE l.nombre LIKE %:clave% " + "OR l.autor.nombre LIKE %:clave% "
			+ "OR l.editorial.nombre LIKE %:clave% " + "OR l.isbn LIKE %:clave%")
	List<Libro> buscarLibro(String clave);
	
	/**
	 * Busqueda del {@link Libro} por su nombre
	 * @param nombre El nombre del libro
	 * @return el libro encontado y si no lo encuentra, devuelve null
	 */
	@Query(value = "SELECT l FROM Libro l WHERE l.nombre = :nombre")
	Libro findByName(String nombre);
	
	/**
	 * Busqueda del {@link Libro} por su isbn
	 * @param isbn El isbn del libro, que sera un numero en formato String
	 * @return el libro encontado y si no lo encuentra, devuelve null
	 */
	@Query(value = "SELECT l FROM Libro l WHERE l.isbn = :isbn")
	Libro findByIsbn(String isbn);

}
