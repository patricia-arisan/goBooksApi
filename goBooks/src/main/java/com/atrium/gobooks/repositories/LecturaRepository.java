package com.atrium.gobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atrium.gobooks.entities.Lectura;

/**
 * Repositorio encargado de gestionar la persistencia de datos del Lectura
 */
public interface LecturaRepository extends JpaRepository<Lectura, Integer> {
	/**
	 * Busca la lectura de un libro poe el usuario y el libro
	 * @param idLibro El id del libro de la lectura
	 * @param idUsuario El id del usuario de la lectura
	 * @return la lectura encontrada y si no se encuentra, null
	 */
	@Query(value = "SELECT le FROM Lectura le, Libro li, Usuario u WHERE li.id=le.libro.id AND "
			+ "li.id=:idLibro AND u.id=le.usuario.id AND u.id=:idUsuario")
	Lectura buscarLecturaUsuario(Integer idLibro, Integer idUsuario);

	/**
	 * Recupera todas las lecturas del usuario
	 * @param id El id del usuario
	 * @return una lista de {@link Lectura} agregadas por el usuario
	 */
	@Query(value = "SELECT le FROM Lectura le, Usuario u WHERE u.id=le.usuario.id AND u.id=:id")
	List<Lectura> buscarLecturasUsuario(Integer id);

	/**
	 * Recupera las lecturas del usuario en funcion del estado en el que se encuentra
	 * @param idUsuario El id del usuario de la lectura
	 * @param idEstado El id del estado de la lectura del usuario
	 * @return una lista de {@link Lectura} por parte del usuario, correspondientes a un
	 * estado concreto
	 */
	@Query(value = "SELECT le FROM Lectura le, Usuario u, Estado e WHERE u.id=le.usuario.id AND "
			+ "u.id=:idUsuario AND e.id=le.estado.id AND e.id=:idEstado")
	List<Lectura> buscarLecturasEstadoUsuario(Integer idUsuario, Integer idEstado);

	/**
	 * Recupera la puntuacion media de las lecturas de un libro
	 * @param idLibro El id del libro
	 * @return la puntuacion media del libro, que puede tener decimales
	 */
	@Query(value = "SELECT AVG(puntuacion) FROM Lectura le, Libro li WHERE li.id=le.libro.id AND li.id=:idLibro")
	Float mediaLectura(Integer idLibro);

}
