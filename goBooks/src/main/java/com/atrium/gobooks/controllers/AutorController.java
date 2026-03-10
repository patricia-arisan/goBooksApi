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

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioAutor;

/**
 * Controlador Rest para la gestion de autores.
 * Proporciona endpoints para CRUD y consultas
 */
@RestController
@RequestMapping("/api/autor")
public class AutorController {

	@Autowired
	private ServicioAutor servicioAutor;

	/**
	 * Registro de un nuevo autor en la bbdd, con acceso restringido a usuarios 
	 * con rol de Administrador
	 * @param autor El {@link Autor} a guardar
	 * @return El autor guardado junto a su id proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun error durante el proceso
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@PostMapping(value = "/registroAutor")
	public Autor registrarNuevoAutor(@RequestBody Autor autor) throws ServicioException {
		return servicioAutor.guardarAutor(autor);

	}

	/**
	 * Recupera todos los autores de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Autor} ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/listadoAutores")
	public List<Autor> listarAutores() throws ServicioException {
		List<Autor> autores = servicioAutor.buscarAutoresPorOrdenAlfabetico();
		return autores;
	}

	/**
	 * Actualizacion de la informacion de un autor que ya existe en la bbdd, 
	 * con acceso restringido a usuarios con rol de Administrador
	 * @param id El id del autor a actualizar
	 * @param autor El {@link Autor} a actualizar
	 * @return El autor tras ejecutarse la actualizacion
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@PutMapping(value = "/{id}")
	public Autor actualizarAutor(@PathVariable Integer id, @RequestBody Autor autor) throws ServicioException {
		return servicioAutor.modificarAutor(autor);
	}

	/**
	 * Recupera un autor en concreto mediante su identificador
	 * @param id El identificador del {@link Autor}
	 * @return El autor encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@GetMapping(value = "/{id}")
	public Autor buscarAutor(@PathVariable Integer id) throws ServicioException {
		return servicioAutor.obtenerAutor(id);
	}

	/**
	 * Recupera todos los autores de la bbdd ordenados por nombre de la A a la Z con el conteo 
	 * de sus libros asociados
	 * @return una lista de {@link AutorDTO} ordenados de forma alfabetica y con su numero de libros
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/conteoLibros")
	public List<AutorDTO> conteoLibrosAutor() throws ServicioException {
		List<AutorDTO> autores = servicioAutor.numeroLibrosAutor();
		return autores;
	}

	/**
	 * Eliminacion del autor en el sistema en funcion de su identificador, 
	 * con acceso restringido a usuarios con rol de Administrador
	 * @param id El identificador unico del {@link Autor}
	 * @return ResponseEntity con un estatus 200 OK tras la eliminacion exitosa
	 * @throws ServicioException Si el autor no se encuentra o se encuentra vinculado a un libro
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> eliminarAutor(@PathVariable Integer id) throws ServicioException {
		servicioAutor.eliminarAutor(id);
		return ResponseEntity.ok().build();
	}

}
