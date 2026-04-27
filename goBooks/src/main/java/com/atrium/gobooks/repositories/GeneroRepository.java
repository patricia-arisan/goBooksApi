package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.dto.GeneroDTO;
import com.atrium.gobooks.entities.Genero;

/**
 * Repositorio encargado de gestionar la persistencia de datos del Genero
 */
public interface GeneroRepository extends JpaRepository<Genero, Integer> {
	/**
	 * Recupera todos los generos de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Genero} ordenados de forma alfabetica
	 */
	@Query(value = "SELECT g FROM Genero g ORDER BY g.nombre")
	List<Genero> buscarGenerosPorOrdenAlfabetico();
	
	/**
	 * Recupera todos los generos de la bbdd ordenados por nombre de la A a la Z,
	 * con el conteo de sus libros asociados
	 * @return una lista de {@link GeneroDTO} ordenados de forma alfabetica y con su numero de libros
	 */
	@Query(value = "SELECT NEW com.atrium.gobooks.dto.GeneroDTO(g.id,g.nombre, COUNT(l.genero.nombre)) AS numeroLibros FROM "
			+ "Genero g LEFT JOIN Libro l ON g.id=l.genero.id GROUP BY g.id ORDER BY g.nombre")
	List<GeneroDTO> numeroLibrosGenero();
	
	/**
	 * Busqueda del {@link Genero} por el nombre
	 * @param nombre El nombre del genero
	 * @return el genero encontrado y si no se encuentra, null
	 */
	@Query(value = "SELECT g FROM Genero g WHERE g.nombre = :nombre")
	Genero findByName(String nombre);
	
	/**
	 * Busqueda del numero de libros que tiene un genero
	 * @param id del {@link Genero} que se busca
	 * @return el numero de libros que tiene ese autor
	 */
	@Query(value = "SELECT COUNT(l) FROM Libro l WHERE l.genero.id = :id")
	Long busquedaNumeroLibrosPorGenero(Integer id);

}
