package com.atrium.gobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ErrorResponse;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioLibro;

/**
 * Controlador Rest para la gestion de libros.
 * Proporciona endpoints para CRUD y consultas
 */
@RestController
@RequestMapping("/api/libro")
public class LibroController {

	/**
	 * Inyeccion del servicio {@link ServicioLibro}
	 */
	@Autowired
	private ServicioLibro servicioLibro;

	/**
	 * Registro de un nuevo libro en la bbdd, con acceso restringido a usuarios 
	 * con rol de Administrador
	 * @param libro El {@link Libro} a guardar
	 * @return Un ResponseEntity con el libro guardado junto con su id proporcionado por la bbdd,
	 * o un ErrorResponse si el libro o el isbn ya existen, o si no se incluye al autor, el genero, 
	 * la editorial o el nombre del libro 
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@PostMapping(value = "/registroLibro")
	public ResponseEntity<Object> registrarNuevoLibro(@RequestBody Libro libro) throws ServicioException {
		Libro libroResponse = null;
		try {
			libroResponse = servicioLibro.guardarLibro(libro);
		} catch (ServicioException e) {
			String codigo = "";
			String mensaje = "";
			// Manejo de errores para evitar duplicidades
			if (e.getCodigo().equals(CodigoError.LIBRO_FOUND)) {
				codigo = CodigoError.LIBRO_FOUND;
				mensaje = "El libro ya existe";
			} else if (e.getCodigo().equals(CodigoError.ISBN_FOUND)) {
				codigo = CodigoError.ISBN_FOUND;
				mensaje = "El isbn ya existe";
			// Manejo de errores para evitar campos vacios
			} else if (e.getCodigo().equals(CodigoError.AUTOR_REQUIRED)) {
				codigo = CodigoError.AUTOR_REQUIRED;
				mensaje = "Autor requerido";
			} else if (e.getCodigo().equals(CodigoError.EDITORIAL_REQUIRED)) {
				codigo = CodigoError.EDITORIAL_REQUIRED;
				mensaje = "Editorial requerida";
			} else if (e.getCodigo().equals(CodigoError.GENERO_REQUIRED)) {
				codigo = CodigoError.GENERO_REQUIRED;
				mensaje = "Género requerido";
			} else if (e.getCodigo().equals(CodigoError.NOMBRE_REQUIRED)) {
				codigo = CodigoError.NOMBRE_REQUIRED;
				mensaje = "Nombre requerido";
			}
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		return ResponseEntity.ok(libroResponse);

	}

	/**
	 * Recupera todos los libros de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Libro} ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta 
	 */
	@GetMapping("/listadoLibros")
	public List<Libro> listarLibros() throws ServicioException {
		List<Libro> libros = servicioLibro.buscarLibrosPorOrdenAlfabetico();
		return libros;
	}

	/**
	 * Recupera un libro en concreto mediante su identificador
	 * @param id El identificador del {@link Libro}
	 * @return El libro encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@GetMapping("/{id}")
	public Libro paginaFichaLibro(@PathVariable Integer id) throws ServicioException {
		return servicioLibro.obtenerLibro(id);
	}

	/**
	 * Recupera los libros pertenecientes a un mismo genero, ordenados por nombre de la A a la Z
	 * @param id El id del genero
	 * @return una lista de {@link Libro} del mismo genero ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/categoria/{id}")
	public List<Libro> librosCategoria(@PathVariable Integer id) throws ServicioException {
		List<Libro> libros = servicioLibro.buscarLibrosPorGeneroId(id);
		return libros;
	}

	/**
	 * Recupera los libros pertenecientes a un mismo autor, ordenados por nombre de la A a la Z
	 * @param id El id del autor
	 * @return una lista de {@link Libro} con el mismo autor ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/autor/{id}")
	public List<Libro> librosAutor(@PathVariable Integer id) throws ServicioException {
		List<Libro> libros = servicioLibro.buscarLibrosPorAutorId(id);
		return libros;
	}

	/**
	 * Recupera los libros pertenecientes a una editorial, ordenados por nombre de la A a la Z
	 * @param id El id de la editorial
	 * @return una lista de {@link Libro} de la misma editorial ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/editorial/{id}")
	public List<Libro> librosEditorial(@PathVariable Integer id) throws ServicioException {
		List<Libro> libros = servicioLibro.buscarLibrosPorEditorialId(id);
		return libros;
	}

	/**
	 * Recupera los cuatro ultimos libros registrados en la bbdd, del mas reciente al menos
	 * @return una lista de los ultimos cuatro {@link Libro} incorporados
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/ultimosLibros")
	public List<Libro> listarUltimosLibros() throws ServicioException {
		List<Libro> libros = servicioLibro.buscarUltimosLibrosIncorporados();
		return libros;
	}

	/**
	 * Recupera la lista completa de los ultimos libros registrados, ordenados del mas reciente
	 * al que mas tiempo lleve registrado en la bbdd
	 * @return una lista de los ultimos {@link Libro} incoporados, ordenados cronologicamente
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/listaUltimosLibros")
	public List<Libro> listarUltimosLibrosCompleto() throws ServicioException {
		List<Libro> libros = servicioLibro.buscarTodosUltimosLibrosIncorporados();
		return libros;
	}

	/**
	 * Recupera la lista de libros con su puntuacion media de las lecturas, ordenados 
	 * de la mas alta a la mas baja
	 * @return una lista de {@link Libro} con su media por orden decreciente
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/puntuacionLibros")
	public List<Libro> listarLibrosPuntuacion() throws ServicioException {
		List<Libro> libros = servicioLibro.listaLibrosMayorPuntuacion();
		return libros;
	}

	/**
	 * Recupera la lista de los cuatro libros con mayor puntuacion de lectura, en orden descendente
	 * @return una lista de {@link Libro} con las cuatro mejores puntuaciones medias de lecturas
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/mejorPuntuacionLibros")
	public List<Libro> librosMejorPuntuacion() throws ServicioException {
		List<Libro> libros = servicioLibro.librosMayorPuntuacion();
		return libros;
	}

	/**
	 * Busqueda de libros por nombre del libro, autor, editorial o isbn en la bbdd
	 * @param clave La palabra clave ingresada y enviada en la peticion
	 * @return una lista de {@link Libro} que contengan coincidencias con esa palabra clave
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/resultadosBusqueda")
	public List<Libro> mostrarLibros(@RequestParam String clave) throws ServicioException {
		List<Libro> libros = servicioLibro.busquedaLibros(clave);

		return libros;

	}

	/**
	 * Actualiza la informacion de un libro que ya existe en la bbdd, 
	 * con acceso restringido a usuarios con rol de Administrador
	 * @param id El id del libro a actualizar
	 * @param libro El {@link Libro} a actualizar
	 * @return Un ResponseEntity con el libro tras actualizarse correctamente,
	 * o un ErrorResponse si el libro o el isbn ya existen, o si no se incluye al autor, el genero, 
	 * la editorial o el nombre del libro
	 * @throws ServicioException Si el libro no existe o se produce un error al actualizar
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@PutMapping(value = "/{id}")
	public ResponseEntity<Object> actualizarLibro(@PathVariable Integer id, @RequestBody Libro libro)
			throws ServicioException {
		Libro libroResponse = null;
		try {
			libroResponse = servicioLibro.modificarLibro(libro);
		} catch (ServicioException e) {
			String codigo = "";
			String mensaje = "";
			if (e.getCodigo().equals(CodigoError.LIBRO_FOUND)) {
				codigo = CodigoError.LIBRO_FOUND;
				mensaje = "El libro ya existe";
			} else if (e.getCodigo().equals(CodigoError.ISBN_FOUND)) {
				codigo = CodigoError.ISBN_FOUND;
				mensaje = "El isbn ya existe";
			// Manejo de errores para evitar campos vacios
			} else if (e.getCodigo().equals(CodigoError.AUTOR_REQUIRED)) {
				codigo = CodigoError.AUTOR_REQUIRED;
				mensaje = "Autor requerido";
			} else if (e.getCodigo().equals(CodigoError.EDITORIAL_REQUIRED)) {
				codigo = CodigoError.EDITORIAL_REQUIRED;
				mensaje = "Editorial requerida";
			} else if (e.getCodigo().equals(CodigoError.GENERO_REQUIRED)) {
				codigo = CodigoError.GENERO_REQUIRED;
				mensaje = "Género requerido";
			} else if (e.getCodigo().equals(CodigoError.NOMBRE_REQUIRED)) {
				codigo = CodigoError.NOMBRE_REQUIRED;
				mensaje = "Nombre requerido";
			}
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		return ResponseEntity.ok(libroResponse);
	}

	/**
	 * Elimina al libro del sistema en funcion de su identificador,
	 * con acceso restringido a usuarios con rol de Administrador
	 * @param id El identificador del {@link Libro}
	 * @return ResponseEntity con un estatus 200 OK tras la eliminacion exitosa
	 * @throws ServicioException Si el libro no se encuentra o se encuentra vinculado a un libro
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> eliminarLibro(@PathVariable Integer id) throws ServicioException {
		servicioLibro.eliminarLibro(id);
		return ResponseEntity.ok().build();
	}

}
