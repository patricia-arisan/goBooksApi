package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.ServicioException;

/**
 * Interfaz que define los servicios de gestion del libro o libros
 * Permite operaciones CRUD y consultas especificas
 */
public interface ServicioLibro {
	
	/**
	 * Recupera todos los libros de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Libro} ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Libro> buscarLibrosPorOrdenAlfabetico() throws ServicioException;

	/**
	 * Recupera un libro en concreto mediante su identificador
	 * @param idLibro El identificador del {@link Libro}
	 * @return El libro encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	Libro obtenerLibro(Integer idLibro) throws ServicioException;

	/**
	 * Agrega y guarda un nuevo libro en la bbdd
	 * @param libro El {@link Libro} a guardar
	 * @return El libro guardado junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	Libro guardarLibro(Libro libro) throws ServicioException;

	/**
	 * Elimina al libro del sistema en funcion de su identificador
	 * @param idLibro El identificador del {@link Libro}
	 * @throws ServicioException Si el libro no se encuentra
	 */
	void eliminarLibro(Integer idLibro) throws ServicioException;
	
	/**
	 * Recupera los libros pertenecientes a un mismo genero, ordenados por nombre de la A a la Z
	 * @param id El id del genero
	 * @return una lista de {@link Libro} del mismo genero ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Libro> buscarLibrosPorGeneroId(Integer id) throws ServicioException;
	
	/**
	 * Recupera los libros pertenecientes a un mismo autor, ordenados por nombre de la A a la Z
	 * @param id El id del autor
	 * @return una lista de {@link Libro} con el mismo autor ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Libro> buscarLibrosPorAutorId(Integer id) throws ServicioException;
	
	/**
	 * Recupera los libros pertenecientes a una editorial, ordenados por nombre de la A a la Z
	 * @param id El id de la editorial
	 * @return una lista de {@link Libro} de la misma editorial ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Libro> buscarLibrosPorEditorialId(Integer id) throws ServicioException;
	
	/**
	 * Recupera los cuatro ultimos libros registrados en la bbdd, del mas reciente al menos
	 * @return una lista de los ultimos cuatro {@link Libro} incorporados
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Libro> buscarUltimosLibrosIncorporados() throws ServicioException;
	
	/**
	 * Recupera la lista completa de los ultimos libros registrados, ordenados del mas reciente
	 * al que mas tiempo lleve registrado en la bbdd
	 * @return una lista de los ultimos {@link Libro} incoporados, ordenados cronologicamente
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Libro> buscarTodosUltimosLibrosIncorporados() throws ServicioException;
	
	/**
	 * Recupera la lista de libros con su puntuacion media de las lecturas, ordenados 
	 * de la mas alta a la mas baja
	 * @return una lista de {@link Libro} con su media por orden decreciente
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List <Libro> listaLibrosMayorPuntuacion() throws ServicioException;
	
	/**
	 * Recupera la lista de los cuatro libros con mayor puntuacion de lectura, en orden descendente
	 * @return una lista de {@link Libro} con las cuatro mejores puntuaciones medias de lecturas
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List <Libro> librosMayorPuntuacion() throws ServicioException;
	
	/**
	 * Busqueda de libros por nombre del libro, autor, editorial o isbn en la bbdd
	 * @param clave La palabra clave ingresada y enviada en la peticion
	 * @return una lista de {@link Libro} que contengan coincidencias con esa palabra clave
	 * en alguno de sus campos definidos en la busqueda
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Libro> busquedaLibros(String clave) throws ServicioException;
	
	/**
	 * Actualiza la informacion de un libro que ya existe en la bbdd
	 * @param libro El {@link Libro} a actualizar
	 * @return El libro tras ejecutarse la actualizacion
	 * @throws ServicioException Si el libro no existe o se produce un error al actualizar
	 */
	Libro modificarLibro(Libro libro) throws ServicioException;	

}
