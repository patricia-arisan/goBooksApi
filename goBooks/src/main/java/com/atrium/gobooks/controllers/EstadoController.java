package com.atrium.gobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioEstado;

@RestController
@RequestMapping("/api/estado")
public class EstadoController {
	
	@Autowired
	private ServicioEstado servicioEstado;
	
	@GetMapping("/listadoEstados")
	public List <Estado> listarEstados() throws ServicioException{
		List <Estado> estados = servicioEstado.listaEstados();
		return estados;
	}

}
