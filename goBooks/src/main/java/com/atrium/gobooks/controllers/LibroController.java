package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioLibro;

@RestController
@RequestMapping("/api/libro")
public class LibroController {

	@Autowired
	private ServicioLibro servicioLibro;
	
	@PostMapping(value="/registroLibro")
	public Libro registrarNuevoLibro(@RequestBody Libro libro) throws ServicioException {
		return servicioLibro.guardarLibro(libro);
		 
	}
	
}
