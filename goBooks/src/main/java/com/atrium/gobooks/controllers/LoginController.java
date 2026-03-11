package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Usuario;
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
	 * @return El usuario guardado junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun error durante el proceso
	 */
	@PostMapping(value = "/registroUsuario")
	public Usuario registrarCuentaDeUsuario(@RequestBody Usuario usuario) throws ServicioException {
		return servicio.registrar(usuario);

	}

}
