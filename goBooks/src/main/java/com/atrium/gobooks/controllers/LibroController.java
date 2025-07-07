package com.atrium.gobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping("/listadoLibros")
	public List <Libro> listarLibros() throws ServicioException{
		List <Libro> libros = servicioLibro.buscarLibrosPorOrdenAlfabetico();
		return libros;
	}
	
	@GetMapping("/{id}")
	public Libro paginaFichaLibro(@PathVariable Integer id) throws Exception {
		return servicioLibro.obtenerLibro(id);
		
		
	}

	
}
