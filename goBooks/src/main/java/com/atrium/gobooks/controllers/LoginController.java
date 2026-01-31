package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioUsuario;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

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
    public ResponseEntity<Usuario> getCurrentUser(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
     // ESTO ES LA CLAVE: Crea la sesión si no existe y dispara el guardado en Redis
        HttpSession session = request.getSession(true);
        
        String currentUsername = authentication.getName();
        return servicio.findByUsername(currentUsername)
        		.map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }
	
	@PostMapping(value="/registroUsuario")
	public Usuario registrarCuentaDeUsuario(@RequestBody Usuario usuario) throws ServicioException {
		return servicio.registrar(usuario);
		 
	}
	
}
