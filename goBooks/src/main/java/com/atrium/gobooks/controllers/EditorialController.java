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
import com.atrium.gobooks.dto.EditorialDTO;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioEditorial;

@RestController
@RequestMapping("/api/editorial")
public class EditorialController {
	
	@Autowired
	private ServicioEditorial servicioEditorial;
	
	@PostMapping(value="/registroEditorial")
	public Editorial registrarNuevoEditorial(@RequestBody Editorial editorial) throws ServicioException {
		return servicioEditorial.guardarEditorial(editorial);
		 
	}
	
	@GetMapping("/listadoEditoriales")
	public List <Editorial> listarEditoriales() throws ServicioException{
		List <Editorial> editoriales = servicioEditorial.buscarEditorialesPorOrdenAlfabetico();
		return editoriales;
	}
	
	@PutMapping(value="/{id}")
	public Editorial actualizarEditorial(@PathVariable Integer id, @RequestBody Editorial editorial) throws ServicioException {
		return servicioEditorial.modificarEditorial(editorial);
	}
	@GetMapping(value="/{id}")
	public Editorial find(@PathVariable Integer id) throws ServicioException{
		return servicioEditorial.obtenerEditorial(id);
	}
	
	@GetMapping("/conteoLibros")
	public List <EditorialDTO> conteoLibrosEditorial() throws ServicioException{
		List <EditorialDTO> editoriales = servicioEditorial.numeroLibrosEditorial();
		return editoriales;
	}
	
	@DeleteMapping(value="/{id}") 
	public ResponseEntity<?> eliminarEditorial(@PathVariable Integer id) throws Exception{
		servicioEditorial.eliminarEditorial(id);
		return ResponseEntity.ok().build();
	}

}
