package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.dto.EditorialDTO;
import com.atrium.gobooks.entities.Editorial;

/**
 * Repositorio encargado de gestionar la persistencia de datos de la Editorial
 */
public interface EditorialRepository extends JpaRepository<Editorial, Integer> {
	/**
	 * Recupera todas las editoriales de la bbdd ordenadas por nombre de la A a la Z
	 * @return una lista de {@link Editorial} ordenadas de forma alfabetica
	 */
	@Query(value = "SELECT e FROM Editorial e ORDER BY e.nombre")
	List<Editorial> buscarEditorialesPorOrdenAlfabetico();

	/**
	 * Recupera todas las editoriales de la bbdd ordenadas por nombre de la A a la Z,
	 * con el conteo de sus libros asociados
	 * @return una lista de {@link EditorialDTO} ordenadas de forma alfabetica y con su numero de libros
	 */
	@Query(value = "SELECT NEW com.atrium.gobooks.dto.EditorialDTO(e.id,e.nombre, COUNT(l.editorial.nombre)) AS numeroLibros FROM "
			+ "Editorial e LEFT JOIN Libro l ON e.id=l.editorial.id GROUP BY e.id ORDER BY e.nombre")
	List<EditorialDTO> numeroLibrosEditorial();

	/**
	 * Busqueda de {@link Editorial} por el nombre
	 * @param nombre El nombre de la editorial
	 * @return la editorial encontrada y si no se encuentra, null
	 */
	@Query(value = "SELECT e FROM Editorial e WHERE e.nombre = :nombre")
	Editorial findByName(String nombre);

}
