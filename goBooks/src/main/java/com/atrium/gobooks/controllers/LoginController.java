package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioUsuario;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class LoginController {
	
	@Autowired
	private ServicioUsuario servicio;
	
	@Autowired
    public LoginController(ServicioUsuario servicio) {
        this.servicio =servicio;
    }
	
	@PostMapping("/login")
    public ResponseEntity<Usuario> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        return servicio.findByUsername(currentUsername)
        		.map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }
	
	@ModelAttribute("usuario")
	public Usuario retornarNuevoUsuarioRegistro() {
		return new Usuario();
	}
	
	@PostMapping(value="/registroUsuario")
	public Usuario registrarCuentaDeUsuario(@RequestBody Usuario usuario) throws ServicioException {
		return servicio.registrar(usuario);
		 
	}
	
}
