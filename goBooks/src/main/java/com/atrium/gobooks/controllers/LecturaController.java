package com.atrium.gobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.dto.LecturaDTO;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.services.ServicioLectura;

@RestController
@RequestMapping("/api/lectura")
public class LecturaController {
	
	@Autowired
	private ServicioLectura servicioLectura;
	
	@PostMapping(value="/registroLectura")
	public Lectura registrarNuevaLectura(@RequestBody LecturaDTO lectura) throws Exception {
		
		return servicioLectura.grabarLectura(lectura);
	}

}
