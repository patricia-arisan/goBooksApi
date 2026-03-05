package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.dto.GeneroDTO;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.exceptions.ServicioException;

/**
 * Interfaz que define los servicios de gestion del genero o generos
 * Permite operaciones CRUD y consultas especificas
 */
public interface ServicioGenero {
	
	/**
	 * Agrega y guarda un nuevo genero en la bbdd
	 * @param genero El {@link Genero} a guardar
	 * @return El genero guardado junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	Genero guardarGenero(Genero genero) throws ServicioException;
	
	/**
	 * Recupera todos los generos de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Genero} ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Genero> buscarGenerosPorOrdenAlfabetico() throws ServicioException;
	
	/**
	 * Recupera un genero en concreto mediante su identificador
	 * @param id El identificador del {@link Genero}
	 * @return El genero encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	Genero obtenerGenero(Integer id) throws ServicioException;
	
	/**
	 * Actualiza la informacion de un genero que ya existe en la bbdd
	 * @param genero El {@link Genero} a actualizar
	 * @return El genero tras ejecutarse la actualizacion
	 * @throws ServicioException Si el genero no existe o se produce un error al actualizar
	 */
	Genero modificarGenero(Genero genero) throws ServicioException;
	
	/**
	 * Recupera todos los generos de la bbdd ordenados por nombre de la A a la Z,
	 * con el conteo de sus libros asociados
	 * @return una lista de {@link GeneroDTO} ordenados de forma alfabetica y con su numero de libros
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<GeneroDTO> numeroLibrosGenero() throws ServicioException;
	
	/**
	 * Elimina al genero del sistema en funcion de su identificador
	 * @param id El identificador del {@link Genero}
	 * @throws ServicioException Si el genero no se encuentra o se encuentra vinculado a un libro
	 */
	void eliminarGenero(Integer id) throws ServicioException;

}
