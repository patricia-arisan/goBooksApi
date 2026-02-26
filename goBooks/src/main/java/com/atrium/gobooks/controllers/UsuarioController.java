package com.atrium.gobooks.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.dto.PasswordDTO;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.UsuarioRepository;
import com.atrium.gobooks.services.ServicioUsuario;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
	
	@Autowired
	private ServicioUsuario usuarioServicio;
	
//	@GetMapping("/test-session")
//	public String test(HttpSession session) {
//	    session.setAttribute("prueba", "funciona");
//	    return "ID de sesión: " + session.getId();
//	}
	
	@PreAuthorize("hasAuthority('Usuario') || hasAuthority('Administrador')") // CUIDADO, pero parece que funciona
	@GetMapping(value="/{id}")
	public Usuario mostrar(@PathVariable Integer id) throws ServicioException {
		
		return usuarioServicio.conseguirUsuario(id);

	}
	
	@PreAuthorize("hasAuthority('Usuario')")
	@PutMapping(value="/{id}")
	public Usuario actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) throws ServicioException {
		
		return usuarioServicio.modificar(usuario);
		
		
		
	}

	
	@PreAuthorize("hasAuthority('Usuario')")
	@PutMapping(value="/cambiarPassword/{id}")
	public Usuario actualizarPasswordUsuario(@PathVariable Integer id, @RequestBody PasswordDTO password) throws ServicioException {
		return usuarioServicio.modificarPassword(password.getPassword(), id);
		
		 
		 
	}
	
	
	
	
	@PreAuthorize("hasAuthority('Usuario')")
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
