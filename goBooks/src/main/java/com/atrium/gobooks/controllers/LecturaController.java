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

import com.atrium.gobooks.dto.LecturaDTO;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ErrorResponse;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioLectura;

/**
 * Controlador Rest para la gestion de lecturas.
 * Proporciona endpoints para CRUD y consultas
 */
@RestController
@RequestMapping("/api/lectura")
public class LecturaController {

	/**
	 * Inyeccion del servicio {@link ServicioLectura}
	 */
	@Autowired
	private ServicioLectura servicioLectura;

	/**
	 * Registro de una nueva lectura en la bbdd, con acceso restringido a usuarios 
	 * con rol de Usuario
	 * @param lectura La {@link LecturaDTO} a guardar
	 * @return Un ResponseEntity con la lectura guardada junto a su identificador unico proporcionado 
	 * por la bbdd, o un ErrorResponse si la lectura recibe un estado 1 o si no se introduce el libro,
	 * el usuario o el estado
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	@PreAuthorize("hasAuthority('Usuario')")
	@PostMapping(value = "/registroLectura")
	public ResponseEntity<Object> registrarNuevaLectura(@RequestBody LecturaDTO lectura) throws ServicioException {
		Lectura lecturaResponse = null;
		
		try {
			lecturaResponse = servicioLectura.grabarLectura(lectura);
		} catch (ServicioException e) {
			String codigo = "";
			String mensaje = "";
			if (e.getCodigo().equals(CodigoError.LECTURA_INVALID_STATE)) {
				codigo = CodigoError.LECTURA_INVALID_STATE;
				mensaje = "La lectura no puede guardarse con estado 1 (No leído) en la base de datos";
			} else if (e.getCodigo().equals(CodigoError.LIBRO_REQUIRED)) {
				codigo = CodigoError.LIBRO_REQUIRED;
				mensaje = "Libro requerido";
			} else if (e.getCodigo().equals(CodigoError.USUARIO_REQUIRED)) {
				codigo = CodigoError.USUARIO_REQUIRED;
				mensaje = "Usuario requerido";
			} else if (e.getCodigo().equals(CodigoError.ESTADO_REQUIRED)) {
				codigo = CodigoError.ESTADO_REQUIRED;
				mensaje = "Estado requerido";
			} else if (e.getCodigo().equals(CodigoError.LECTURA_FOUND)) {
				codigo = CodigoError.LECTURA_FOUND;
				mensaje = "Ya existe una lectura de este libro por el usuario";
			}
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		return ResponseEntity.ok(lecturaResponse);
			
	}

	/**
	 * Busca la {@link Lectura} de un libro por el usuario y el libro, , con acceso restringido 
	 * a usuarios con rol de Usuario
	 * @param idUsuario El id del usuario de la lectura
	 * @param idLibro El id del libro de la lectura
	 * @return la lectura encontrada y si no se encuentra, null
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@PreAuthorize("hasAuthority('Usuario')")
	@GetMapping(value = "/{idUsuario}")
	public Lectura mostrarLectura(@PathVariable Integer idUsuario, @RequestParam Integer idLibro)
			throws ServicioException {
		return servicioLectura.buscarLecturaUsuario(idLibro, idUsuario);

	}

	/**
	 * Actualizacion de la informacion de una lectura que ya existe en la bbdd,
	 * con acceso restringido a usuarios con rol de Usuario
	 * @param id El id de la lectura a actualizar
	 * @param lectura La {@link Lectura} a actualizar
	 * @return Un ResponseEntity con la lectura tras ejecutarse la actualizacion,
	 * o un ErrorResponse si la lectura recibe un estado 1 o si no se introduce el libro,
	 * el usuario o el estado
	 * @throws ServicioException Si la lectura no existe o se produce un error al actualizar
	 */
	@PreAuthorize("hasAuthority('Usuario')")
	@PutMapping(value = "/{id}")
	public ResponseEntity<Object> actualizarLectura(@PathVariable Integer id, @RequestBody Lectura lectura) throws ServicioException {
		Lectura lecturaResponse = null;
		try {
			lecturaResponse = servicioLectura.modificarLectura(lectura);
		} catch (ServicioException e) {
			String codigo = "";
			String mensaje = "";
			if (e.getCodigo().equals(CodigoError.LECTURA_INVALID_STATE)) {
				codigo = CodigoError.LECTURA_INVALID_STATE;
				mensaje = "La lectura no puede guardarse con estado 1 (No leído) en la base de datos";
			} else if (e.getCodigo().equals(CodigoError.LIBRO_REQUIRED)) {
				codigo = CodigoError.LIBRO_REQUIRED;
				mensaje = "Libro requerido";
			} else if (e.getCodigo().equals(CodigoError.USUARIO_REQUIRED)) {
				codigo = CodigoError.USUARIO_REQUIRED;
				mensaje = "Usuario requerido";
			} else if (e.getCodigo().equals(CodigoError.ESTADO_REQUIRED)) {
				codigo = CodigoError.ESTADO_REQUIRED;
				mensaje = "Estado requerido";
			}
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		return ResponseEntity.ok(lecturaResponse);
	}

	/**
	 * Elimina la lectura del sistema en funcion de su identificador,
	 * con acceso restringido a usuarios con rol de Usuario
	 * @param id El identificador de {@link Lectura}
	 * @return ResponseEntity con un estatus 200 OK tras la eliminacion exitosa
	 * @throws ServicioException Si la lectura no se encuentra
	 */
	@PreAuthorize("hasAuthority('Usuario')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> eliminarLectura(@PathVariable Integer id) throws ServicioException {
		servicioLectura.eliminarLectura(id);
		return ResponseEntity.ok().build();
	}

	/**
	 * Recupera todas las lecturas del usuario, con acceso restringido a usuarios con rol de Usuario
	 * @param id El id del usuario
	 * @return una lista de {@link Lectura} agregadas por el usuario
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@PreAuthorize("hasAuthority('Usuario')")
	@GetMapping("/listadoLecturas/{id}")
	public List<Lectura> listarLecturas(@PathVariable Integer id) throws ServicioException {
		List<Lectura> lecturas = servicioLectura.buscarLecturasUsuario(id);
		return lecturas;
	}

	/**
	 * Recupera las lecturas del usuario en funcion del estado en el que se encuentra,
	 * con acceso restringido a usuarios con rol de Usuario
	 * @param idUsuario El id del usuario de la lectura
	 * @param idEstado El id del estado de la lectura del usuario
	 * @return una lista de {@link Lectura} por parte del usuario, correspondientes a un
	 * estado concreto
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@PreAuthorize("hasAuthority('Usuario')")
	@GetMapping("/listadoLecturasEstado/{idUsuario}")
	public List<Lectura> listarLecturasPorEstado(@PathVariable Integer idUsuario, @RequestParam Integer idEstado)
			throws ServicioException {
		List<Lectura> lecturas = servicioLectura.buscarLecturasEstadoUsuario(idUsuario, idEstado);
		return lecturas;
	}

	/**
	 * Recupera la puntuacion media de las lecturas de un libro
	 * @param idLibro El id del libro
	 * @return la puntuacion media del libro, que puede tener decimales
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/mediaPuntuacionLibro/{idLibro}")
	public Float mediaPuntuacion(@PathVariable Integer idLibro) throws ServicioException {
		Float mediaLectura = servicioLectura.mediaLectura(idLibro);
		return mediaLectura;
	}

}
