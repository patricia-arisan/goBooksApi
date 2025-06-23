package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioUsuario;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
	
	@Autowired
	private ServicioUsuario usuarioServicio;
	
	@GetMapping(value="/{id}")
	public Usuario mostrar(@PathVariable Integer id) throws ServicioException {
		
		return usuarioServicio.conseguirUsuario(id);

	}
	
	@PutMapping(value="/{id}")
	public Usuario actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) throws ServicioException {
		return usuarioServicio.modificar(usuario);
		 
	}
//	@PutMapping
//	public Usuario actualizarUsuario(@RequestBody Integer id, @RequestBody Usuario usuario) throws ServicioException {
//		return usuarioServicio.modificar(usuario);
//		 
//	}
		
}
