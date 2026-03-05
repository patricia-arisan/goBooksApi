package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.exceptions.ServicioException;

/**
 * Interfaz que define los servicios de gestion del autor o autores
 * Permite operaciones CRUD y consultas especificas
 */
public interface ServicioAutor {
	
	/**
	 * Agrega y guarda un nuevo autor en la bbdd
	 * @param autor El {@link Autor} a guardar
	 * @return El autor guardado junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	Autor guardarAutor(Autor autor) throws ServicioException;
	
	/**
	 * Recupera un autor en concreto mediante su identificador
	 * @param id El identificador del {@link Autor}
	 * @return El autor encontrado 
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	Autor obtenerAutor(Integer id) throws ServicioException;
	
	/**
	 * Recupera todos los autores de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Autor} ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Autor> buscarAutoresPorOrdenAlfabetico() throws ServicioException;
	
	/**
	 * Actualiza la informacion de un autor que ya existe en la bbdd
	 * @param autor El {@link Autor} a actualizar
	 * @return El autor tras ejecutarse la actualizacion
	 * @throws ServicioException Si el autor no existe o se produce un error al actualizar
	 */
	Autor modificarAutor(Autor autor) throws ServicioException;
	
	/**
	 * Recupera todos los autores de la bbdd ordenados por nombre de la A a la Z con el conteo 
	 * de sus libros asociados
	 * @return una lista de {@link AutorDTO} ordenados de forma alfabetica y con su numero de libros
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<AutorDTO> numeroLibrosAutor() throws ServicioException; 
	
	/**
	 * Elimina al autor del sistema en funcion de su identificador
	 * @param id El identificador del {@link Autor}
	 * @throws ServicioException Si el autor no se encuentra o se encuentra vinculado a un libro
	 */
	void eliminarAutor(Integer id) throws ServicioException;
}
