package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.dto.EditorialDTO;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.exceptions.ServicioException;

/**
 * Interfaz que define los servicios de gestion de la editorial o editoriales
 * Permite operaciones CRUD y consultas especificas
 */
public interface ServicioEditorial {
	
	/**
	 * Agrega y guarda una nueva editorial en la bbdd
	 * @param editorial La {@link Editorial} a guardar
	 * @return La editorial guardada junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	Editorial guardarEditorial(Editorial editorial) throws ServicioException;
	
	/**
	 * Recupera todas las editoriales de la bbdd ordenadas por nombre de la A a la Z
	 * @return una lista de {@link Editorial} ordenadas de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Editorial> buscarEditorialesPorOrdenAlfabetico() throws ServicioException;
	
	/**
	 * Actualiza la informacion de una editorial que ya existe en la bbdd
	 * @param editorial La {@link Editorial} a actualizar
	 * @return La editorial tras ejecutarse la actualizacion
	 * @throws ServicioException Si la editorial no existe o se produce un error al actualizar
	 */
	Editorial modificarEditorial(Editorial editorial) throws ServicioException;
	
	/**
	 * Recupera una editorial en concreto mediante su identificador
	 * @param id El identificador de la {@link Editorial}
	 * @return La editorial encontrada
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	Editorial obtenerEditorial(Integer id) throws ServicioException;
	
	/**
	 * Recupera todas las editoriales de la bbdd ordenadas por nombre de la A a la Z,
	 * con el conteo de sus libros asociados
	 * @return una lista de {@link EditorialDTO} ordenadas de forma alfabetica y con su numero de libros
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<EditorialDTO> numeroLibrosEditorial() throws ServicioException;
	
	/**
	 * Elimina la editorial del sistema en funcion de su identificador
	 * @param id El identificador de la {@link Editorial}
	 * @throws ServicioException Si la editorial no se encuentra o se encuentra vinculada a un libro
	 */
	void eliminarEditorial(Integer id) throws ServicioException;

}
