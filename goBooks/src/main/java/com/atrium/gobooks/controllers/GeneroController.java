package com.atrium.gobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.dto.GeneroDTO;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioGenero;

@RestController
@RequestMapping("/api/genero")
public class GeneroController {
	
	@Autowired
	private ServicioGenero servicioGenero;
	
	@PostMapping(value="/registroGenero")
	public Genero registrarNuevoGenero(@RequestBody Genero genero) throws ServicioException {
		return servicioGenero.guardarGenero(genero);
		 
	}
	
	@GetMapping("/listadoGeneros")
	public List <Genero> listarGeneros() throws ServicioException{
		List <Genero> generos = servicioGenero.buscarGenerosPorOrdenAlfabetico();
		return generos;
	}
	
	@PutMapping(value="/{id}")
	public Genero actualizarGenero(@PathVariable Integer id, @RequestBody Genero genero) throws ServicioException {
		return servicioGenero.modificarGenero(genero);
	}
	@GetMapping(value="/{id}")
	public Genero find(@PathVariable Integer id) throws ServicioException{
		return servicioGenero.obtenerGenero(id);
	}
	
	@GetMapping("/conteoLibros")
	public List <GeneroDTO> conteoLibrosGenero() throws ServicioException{
		List <GeneroDTO> generos = servicioGenero.numeroLibrosGenero();
		return generos;
	}
	
	@DeleteMapping(value="/{id}") 
	public ResponseEntity<?> eliminarGenero(@PathVariable Integer id) throws Exception{
		servicioGenero.eliminarGenero(id);
		return ResponseEntity.ok().build();
	}

}
