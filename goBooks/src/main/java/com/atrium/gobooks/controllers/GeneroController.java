package com.atrium.gobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioAutor;
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

}
