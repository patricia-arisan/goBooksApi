package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@PutMapping(value="/cambiarPassword/{id}")
	public Usuario actualizarPasswordUsuario(@PathVariable Integer id, @RequestParam String password) throws ServicioException {
		return usuarioServicio.modificarPassword(password, id);
		
		 
		 
	}
	
	
	
	
	
	@DeleteMapping(value="/{id}") 
	public ResponseEntity<?> eliminar(@PathVariable Integer id) throws Exception{
		usuarioServicio.eliminarUsuario(id);
		return ResponseEntity.ok().build();
	}
	
//	@PutMapping
//	public Usuario actualizarUsuario(@RequestBody Integer id, @RequestBody Usuario usuario) throws ServicioException {
//		return usuarioServicio.modificar(usuario);
//		 
//	}
		
}
