package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ErrorResponse;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioUsuario;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

/**
 * Controlador Rest para la gestion de usuarios.
 * Engloba el inicio de sesion y el registro del nuevo usuario 
 */
 
@RestController
@RequestMapping("/api")
public class LoginController {

	/**
	 * Inyeccion del servicio {@link ServicioUsuario}
	 */
	@Autowired
	private ServicioUsuario servicio;

	/**
	 * Obtiene los detalles del usuario autenticado.
	 * @param request Objeto {@link HttpServletRequest} para la gestion de la sesion
	 * @return ResponseEntity con el objeto {@link Usuario} si se le encuentra en la bbdd, o si no
	 * un badrequest
	 */
	@PostMapping("/login")
	public ResponseEntity<Usuario> getCurrentUser(HttpServletRequest request) {
		// Recupera la informacion de autenticacion del contexto de seguridad de Spring
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		// Crea la sesion si no existe, necesario para redis
		HttpSession session = request.getSession(true);

		// Extrae el username de acceso del usuario y busca sus datos en la bbdd
		String currentUsername = authentication.getName();
		return servicio.findByUsername(currentUsername).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.badRequest().build());
	}

	/**
	 * Registro de un nuevo usuario en la bbdd
	 * @param usuario El nuevo {@link Usuario} a guardar
	 * @return Un ResponseEntity con el usuario guardado junto a su identificador unico proporcionado 
	 * por la bbdd, o un ErrorResponse si el usuario ya existe, si el username o el password son nulos
	 * o no validos
	 * @throws ServicioException Si ocurre algun error durante el proceso
	 */
	@PostMapping(value = "/registroUsuario")
	public ResponseEntity<Object> registrarCuentaDeUsuario(@RequestBody Usuario usuario) throws ServicioException {
		Usuario usuarioResponse = null;
		try {
			usuarioResponse = servicio.registrar(usuario);
		} catch (ServicioException e) {
			String codigo = "";
			String mensaje = "";
			
			if (e.getCodigo().equals(CodigoError.USERNAME_REQUIRED)) {
				codigo = CodigoError.USERNAME_REQUIRED;
				mensaje = "Username requerido";
			} else if (e.getCodigo().equals(CodigoError.USERNAME_INVALID_FORMAT)) {
				codigo = CodigoError.USERNAME_INVALID_FORMAT;
				mensaje = "El formato de la dirección de correo no es válido";
			} else if (e.getCodigo().equals(CodigoError.PASSWORD_REQUIRED)) {
				codigo = CodigoError.PASSWORD_REQUIRED;
				mensaje = "Contraseña requerida";
			} else if (e.getCodigo().equals(CodigoError.PASSWORD_INVALID_FORMAT)) {
				codigo = CodigoError.PASSWORD_INVALID_FORMAT;
				mensaje = "El formato de la contraseña no es válido, debe tener al menos 6 caracteres, "
						+ "sin espacios en blanco";
			} else if (e.getCodigo().equals(CodigoError.USUARIO_FOUND)) {
				codigo = CodigoError.USUARIO_FOUND;
				mensaje = "El usuario ya existe";
			}
			
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		
		return ResponseEntity.ok(usuarioResponse);

	}

}
