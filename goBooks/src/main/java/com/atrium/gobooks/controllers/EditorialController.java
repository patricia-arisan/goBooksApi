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

import com.atrium.gobooks.dto.EditorialDTO;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioEditorial;

/**
 * Controlador Rest para la gestion de editoriales.
 * Proporciona endpoints para CRUD y consultas
 */
@RestController
@RequestMapping("/api/editorial")
public class EditorialController {

	/**
	 * Inyeccion del servicio {@link ServicioEditorial}
	 */
	@Autowired
	private ServicioEditorial servicioEditorial;

	/**
	 * Registro de una nueva editorial en la bbdd, con acceso restringido a usuarios 
	 * con rol de Administrador
	 * @param editorial La {@link Editorial} a guardar
	 * @return La editorial guardada junto a su id unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@PostMapping(value = "/registroEditorial")
	public Editorial registrarNuevaEditorial(@RequestBody Editorial editorial) throws ServicioException {
		return servicioEditorial.guardarEditorial(editorial);

	}

	/**
	 * Recupera todas las editoriales de la bbdd ordenadas por nombre de la A a la Z
	 * @return una lista de {@link Editorial} ordenadas de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/listadoEditoriales")
	public List<Editorial> listarEditoriales() throws ServicioException {
		List<Editorial> editoriales = servicioEditorial.buscarEditorialesPorOrdenAlfabetico();
		return editoriales;
	}

	/**
	 * Actualiza la informacion de una editorial que ya existe en la bbdd, 
	 * con acceso restringido a usuarios con rol de Administrador
	 * @param id El id de la editorial a actualizar
	 * @param editorial La {@link Editorial} a actualizar
	 * @return La editorial tras ejecutarse la actualizacion
	 * @throws ServicioException Si la editorial no existe o se produce un error al actualizar
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@PutMapping(value = "/{id}")
	public Editorial actualizarEditorial(@PathVariable Integer id, @RequestBody Editorial editorial)
			throws ServicioException {
		return servicioEditorial.modificarEditorial(editorial);
	}

	/**
	 * Recupera una editorial en concreto mediante su identificador
	 * @param id El identificador de la {@link Editorial}
	 * @return La editorial encontrada
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@GetMapping(value = "/{id}")
	public Editorial buscarEditorial(@PathVariable Integer id) throws ServicioException {
		return servicioEditorial.obtenerEditorial(id);
	}

	/**
	 * Recupera todas las editoriales de la bbdd ordenadas por nombre de la A a la Z,
	 * con el conteo de sus libros asociados
	 * @return una lista de {@link EditorialDTO} ordenadas de forma alfabetica y con su 
	 * numero de libros
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/conteoLibros")
	public List<EditorialDTO> conteoLibrosEditorial() throws ServicioException {
		List<EditorialDTO> editoriales = servicioEditorial.numeroLibrosEditorial();
		return editoriales;
	}

	/**
	 * Elimina la editorial del sistema en funcion de su identificador, 
	 * con acceso restringido a usuarios con rol de Administrador
	 * @param id El identificador de la {@link Editorial}
	 * @return ResponseEntity con un estatus 200 OK tras la eliminacion exitosa
	 * @throws ServicioException Si la editorial no se encuentra o se encuentra vinculada a un libro
	 */
	@PreAuthorize("hasAuthority('Administrador')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> eliminarEditorial(@PathVariable Integer id) throws ServicioException {
		servicioEditorial.eliminarEditorial(id);
		return ResponseEntity.ok().build();
	}

}
