package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.entities.Autor;

/**
 * Repositorio encargado de gestionar la persistencia de datos del Autor
 */
public interface AutorRepository extends JpaRepository<Autor, Integer> {
	/**
	 * Recupera todos los autores de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Autor} ordenados de forma alfabetica
	 */
	@Query(value = "SELECT a FROM Autor a ORDER BY a.nombre")
	List<Autor> buscarAutoresPorOrdenAlfabetico();
	
	/**
	 * Recupera todos los autores de la bbdd ordenados por nombre de la A a la Z,
	 * con el conteo de sus libros asociados
	 * @return una lista de {@link AutorDTO} ordenados de forma alfabetica y con su numero de libros
	 */
	@Query(value = "SELECT NEW com.atrium.gobooks.dto.AutorDTO(a.id,a.nombre, COUNT(l.autor.nombre)) AS numeroLibros FROM "
			+ "Autor a LEFT JOIN Libro l ON a.id=l.autor.id GROUP BY a.id ORDER BY a.nombre")
	List<AutorDTO> numeroLibrosAutor();

	/**
	 * Busqueda del autor por el nombre
	 * @param nombre El nombre del autor
	 * @return el autor encontrado y si no se encuentra, null
	 */
	@Query(value="SELECT a FROM Autor a WHERE a.nombre LIKE :nombre")
	Autor findByName(String nombre);
}