package com.atrium.gobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioAutor;



@RestController
@RequestMapping("/api/autor")
public class AutorController {
	
	@Autowired
	private ServicioAutor servicioAutor;
	
	@PostMapping(value="/registroAutor")
	public Autor registrarNuevoAutor(@RequestBody Autor autor) throws ServicioException {
		return servicioAutor.guardarAutor(autor);
		 
	}
	
	@GetMapping("/listadoAutores")
	public List <Autor> listarAutores() throws ServicioException{
		List <Autor> autores = servicioAutor.buscarAutoresPorOrdenAlfabetico();
		return autores;
	}
	
	@PutMapping(value="/{id}")
	public Autor actualizarAutor(@PathVariable Integer id, @RequestBody Autor autor) throws ServicioException {
		return servicioAutor.modificarAutor(autor);
	}
	@GetMapping(value="/{id}")
	public Autor find(@PathVariable Integer id) throws ServicioException{
		return servicioAutor.obtenerAutor(id);
	}

}
