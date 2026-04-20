package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.dto.PasswordDTO;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ErrorResponse;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioUsuario;

/**
 * Controlador Rest para la gestion de usuarios.
 * Proporciona endpoints para CRUD y consultas
 */
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

	/**
	 * Inyeccion del servicio {@link ServicioUsuario}
	 */
	@Autowired
	private ServicioUsuario usuarioServicio;

	/**
	 * Recupera un usuario en concreto mediante su identificador, con acceso para usuarios
	 * con el rol de Usuario o Administrador
	 * @param id El identificador del {@link Usuario}
	 * @return El usuario encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@PreAuthorize("hasAuthority('Usuario') || hasAuthority('Administrador')")
	@GetMapping(value = "/{id}")
	public Usuario mostrar(@PathVariable Integer id) throws ServicioException {
		return usuarioServicio.conseguirUsuario(id);

	}

	/**
	 * Actualiza la informacion de un usuario que ya existe en la bbdd,
	 * con acceso restringido a usuarios con rol de Usuario
	 * @param id El id del usuario a actualizar
	 * @param usuario El {@link Usuario} a actualizar
	 * @return Un ResponseEntity con el usuario tras ejecutarse la actualizacion,
	 * o un ErrorResponse si existe ya un usuario con el username o si el username es nulo o no valido
	 * @throws ServicioException Si el usuario no existe o se produce un error al actualizar
	 */
	@PreAuthorize("hasAuthority('Usuario')")
	@PutMapping(value = "/{id}")
	public ResponseEntity<Object> actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) throws ServicioException {
		Usuario usuarioResponse = null;
		try {
			usuarioResponse = usuarioServicio.modificar(usuario);
		} catch (ServicioException e) {
			String codigo = "";
			String mensaje = "";
			
			if (e.getCodigo().equals(CodigoError.USERNAME_REQUIRED)) {
				codigo = CodigoError.USERNAME_REQUIRED;
				mensaje = "Username requerido";
			} else if (e.getCodigo().equals(CodigoError.USERNAME_INVALID_FORMAT)) {
				codigo = CodigoError.USERNAME_INVALID_FORMAT;
				mensaje = "El formato de la dirección de correo no es válido";
			} else if (e.getCodigo().equals(CodigoError.USUARIO_FOUND)) {
				codigo = CodigoError.USUARIO_FOUND;
				mensaje = "El usuario ya existe";
			}
			
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		
		return ResponseEntity.ok(usuarioResponse);

	}

	/**
	 * Actualiza la informacion del password de un usuario que ya existe en la bbdd,
	 * con acceso restringido a usuarios con rol de Usuario
	 * @param id El id del {@link Usuario} a actualizar
	 * @param password El nuevo password a actualizar del usuario
	 * @return Un ResponseEntity con el usuario tras ejecutarse la actualizacion, o un ErrorResponse 
	 * si el password es nulo o no valido
	 * @throws ServicioException Si el usuario no existe o se produce un error al actualizar
	 */
	@PreAuthorize("hasAuthority('Usuario')")
	@PutMapping(value = "/cambiarPassword/{id}")
	public ResponseEntity<Object> actualizarPasswordUsuario(@PathVariable Integer id, @RequestBody PasswordDTO password)
			throws ServicioException {
		Usuario usuarioResponse = null;
		try {
			usuarioResponse = usuarioServicio.modificarPassword(password.getPassword(), id);
		} catch (ServicioException e) {
			String codigo = "";
			String mensaje = "";
			
			if (e.getCodigo().equals(CodigoError.PASSWORD_REQUIRED)) {
				codigo = CodigoError.PASSWORD_REQUIRED;
				mensaje = "Contraseña requerida";
			} else if (e.getCodigo().equals(CodigoError.PASSWORD_INVALID_FORMAT)) {
				codigo = CodigoError.PASSWORD_INVALID_FORMAT;
				mensaje = "El formato de la contraseña no es válido, debe tener al menos 6 caracteres, "
						+ "sin espacios en blanco";
			}
			
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		
		return ResponseEntity.ok(usuarioResponse);

	}

	/**
	 * Elimina al usuario del sistema en funcion de su identificador,
	 * con acceso restringido a usuarios con rol de Usuario
	 * @param id El identificador del {@link Usuario}
	 * @return ResponseEntity con un estatus 200 OK tras la eliminacion exitosa
	 * @throws ServicioException Si el usuario no se encuentra
	 */
	@PreAuthorize("hasAuthority('Usuario')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> eliminar(@PathVariable Integer id) throws ServicioException {
		usuarioServicio.eliminarUsuario(id);
		return ResponseEntity.ok().build();
	}

}
