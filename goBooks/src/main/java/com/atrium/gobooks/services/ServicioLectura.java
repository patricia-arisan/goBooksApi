package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.dto.LecturaDTO;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.exceptions.ServicioException;

/**
 * Interfaz que define los servicios de gestion dela lectura o lecturas
 * Permite operaciones CRUD y consultas especificas
 */
public interface ServicioLectura {
	
	/**
	 * Agrega y guarda una nueva lectura de un libro en la bbdd
	 * @param lecturaDTO La {@link LecturaDTO} a guardar
	 * @return La lectura guardada junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	Lectura grabarLectura(LecturaDTO lecturaDTO) throws ServicioException;
	
	/**
	 * Actualiza la informacion de una lectura que ya existe en la bbdd
	 * @param lectura La {@link Lectura} a actualizar
	 * @return La lectura tras ejecutarse la actualizacion
	 * @throws ServicioException Si la lectura no existe o se produce un error al actualizar
	 */
	Lectura modificarLectura(Lectura lectura) throws ServicioException;
	
	/**
	 * Elimina la lectura del sistema en funcion de su identificador
	 * @param idLectura El identificador de {@link Lectura}
	 * @throws ServicioException Si la lectura no se encuentra
	 */
	void eliminarLectura(Integer idLectura) throws ServicioException;
	
	/**
	 * Recupera todas las lecturas del usuario
	 * @param id El id del usuario
	 * @return una lista de {@link Lectura} agregadas por el usuario
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List <Lectura> buscarLecturasUsuario(Integer id) throws ServicioException;
	
	/**
	 * Recupera las lecturas del usuario en funcion del estado en el que se encuentra
	 * @param idUsuario El id del usuario de la lectura
	 * @param idEstado El id del estado de la lectura del usuario
	 * @return una lista de {@link Lectura} por parte del usuario, correspondientes a un
	 * estado concreto
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List <Lectura> buscarLecturasEstadoUsuario(Integer idUsuario, Integer idEstado) throws ServicioException;
	
	/**
	 * Busca la {@link Lectura} de un libro poe el usuario y el libro
	 * @param idLibro El id del libro de la lectura
	 * @param idUsuario El id del usuario de la lectura
	 * @return la lectura encontrada y si no se encuentra, null
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	Lectura buscarLecturaUsuario(Integer idLibro, Integer idUsuario) throws ServicioException;
	
	/**
	 * Recupera la puntuacion media de las lecturas de un libro
	 * @param idLibro El id del libro
	 * @return la puntuacion media del libro, que puede tener decimales
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	Float mediaLectura(Integer idLibro) throws ServicioException; 
}
