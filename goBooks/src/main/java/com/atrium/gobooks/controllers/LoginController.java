package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	
	
	@ModelAttribute("usuario")
	public Usuario retornarNuevoUsuarioRegistro() {
		return new Usuario();
	}
	
	@PostMapping(value="/registroUsuario")
	public Usuario registrarCuentaDeUsuario(@RequestBody Usuario usuario) throws ServicioException {
		return servicio.registrar(usuario);
		 
	}
	
}
