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
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.dto.GeneroDTO;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ErrorResponse;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioGenero;

/**
 * Controlador Rest para la gestion de generos.
 * Proporciona endpoints para CRUD y consultas
 */
@RestController
@RequestMapping("/api/genero")
public class GeneroController {

	/**
	 * Inyeccion del servicio {@link ServicioGenero}
	 */
	@Autowired
	private ServicioGenero servicioGenero;

	/**
	 * Registro de un nuevo genero en la bbdd, con acceso restringido a usuarios 
	 * con rol de Administrador
	 * @param genero El {@link Genero} a guardar
	 * @return Un ResponseEntity con el genero guardado junto a su id unico proporcionado por la bbdd,
	 * o un ErrorResponse si el genero ya existe o si el nombre es nulo
	 * @throws ServicioException Si ocurre algun error durante el proceso
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@PostMapping(value = "/registroGenero")
	public ResponseEntity<Object> registrarNuevoGenero(@RequestBody Genero genero) throws ServicioException {
		Genero generoResponse = null;
		try {
			generoResponse = servicioGenero.guardarGenero(genero);
		} catch (ServicioException e) {
			String codigo = "";
			String mensaje = "";
			
			if (e.getCodigo().equals(CodigoError.NOMBRE_REQUIRED)) {
				codigo = CodigoError.NOMBRE_REQUIRED;
				mensaje = "Nombre requerido";
			} else if (e.getCodigo().equals(CodigoError.GENERO_FOUND)) {
				codigo = CodigoError.GENERO_FOUND;
				mensaje = "El género ya existe";
			}
			
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		
		return ResponseEntity.ok(generoResponse);

	}

	/**
	 * Recupera todos los generos de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Genero} ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/listadoGeneros")
	public List<Genero> listarGeneros() throws ServicioException {
		List<Genero> generos = servicioGenero.buscarGenerosPorOrdenAlfabetico();
		return generos;
	}

	/**
	 * Actualiza la informacion de un genero que ya existe en la bbdd,
	 * con acceso restringido a usuarios con rol de Administrador
	 * @param id El id del genero a actualizar
	 * @param genero El {@link Genero} a actualizar
	 * @return Un ResponseEntity con el genero tras ejecutarse la actualizacion,
	 * o un ErrorResponse si el genero ya existe o si el nombre es nulo
	 * @throws ServicioException Si el genero no existe o se produce un error al actualizar
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@PutMapping(value = "/{id}")
	public ResponseEntity<Object> actualizarGenero(@PathVariable Integer id, @RequestBody Genero genero) throws ServicioException {
		Genero generoResponse = null;
		try {
			generoResponse = servicioGenero.modificarGenero(genero);
		} catch (ServicioException e) {
			String codigo = "";
			String mensaje = "";
			
			if (e.getCodigo().equals(CodigoError.NOMBRE_REQUIRED)) {
				codigo = CodigoError.NOMBRE_REQUIRED;
				mensaje = "Nombre requerido";
			} else if (e.getCodigo().equals(CodigoError.GENERO_FOUND)) {
				codigo = CodigoError.GENERO_FOUND;
				mensaje = "El género ya existe";
			}
			
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		
		return ResponseEntity.ok(generoResponse);
	}

	/**
	 * Recupera un genero en concreto mediante su identificador
	 * @param id El identificador del {@link Genero}
	 * @return El genero encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@GetMapping(value = "/{id}")
	public Genero buscarGenero(@PathVariable Integer id) throws ServicioException {
		return servicioGenero.obtenerGenero(id);
	}

	/**
	 * Recupera todos los generos de la bbdd ordenados por nombre de la A a la Z,
	 * con el conteo de sus libros asociados
	 * @return una lista de {@link GeneroDTO} ordenados de forma alfabetica y con su numero de libros
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/conteoLibros")
	public List<GeneroDTO> conteoLibrosGenero() throws ServicioException {
		List<GeneroDTO> generos = servicioGenero.numeroLibrosGenero();
		return generos;
	}

	/**
	 * Elimina al genero del sistema en funcion de su identificador,
	 * con acceso restringido a usuarios con rol de Administrador
	 * @param id El identificador del {@link Genero}
	 * @return ResponseEntity con un estatus 200 OK tras la eliminacion exitosa
	 * @throws ServicioException Si el genero no se encuentra o se encuentra vinculado a un libro
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> eliminarGenero(@PathVariable Integer id) throws ServicioException {
		servicioGenero.eliminarGenero(id);
		return ResponseEntity.ok().build();
	}

}
