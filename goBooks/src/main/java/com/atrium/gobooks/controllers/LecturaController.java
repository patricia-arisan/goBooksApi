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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.dto.LecturaDTO;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioLectura;

@RestController
@RequestMapping("/api/lectura")
public class LecturaController {
	
	@Autowired
	private ServicioLectura servicioLectura;
	
	@PostMapping(value="/registroLectura")
	public Lectura registrarNuevaLectura(@RequestBody LecturaDTO lectura) throws Exception {
		if(servicioLectura.buscarLecturaUsuario(lectura.getIdLibro(),lectura.getIdUsuario())==null){
			return servicioLectura.grabarLectura(lectura);
		}else {
			return null;
		}
		 
	}
	
	@GetMapping(value="/{idUsuario}")
	public Lectura mostrarLectura(@PathVariable Integer idUsuario,@RequestParam Integer idLibro) throws ServicioException {
		
		return servicioLectura.buscarLecturaUsuario(idLibro,idUsuario);

	}
	
	@PutMapping(value="/{id}")
	public Lectura actualizarLectura(@PathVariable Integer id, @RequestBody Lectura lectura) throws ServicioException {
		return servicioLectura.modificarLectura(lectura);
	}
	
	@DeleteMapping(value="/{id}") 
	public ResponseEntity<?> eliminarLectura(@PathVariable Integer id) throws Exception{
		servicioLectura.eliminarLectura(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping(value="/estadoLecturaUsuario/{idUsuario}")
	public Lectura buscarEstadoLecturaUsuario(@PathVariable Integer idUsuario,@RequestParam Integer idLibro) throws ServicioException{
		
			return servicioLectura.buscarLecturaUsuario(idLibro, idUsuario);
		
		
		
	}
	
	@GetMapping("/listadoLecturas/{id}")
	public List <Lectura> listarLecturas(@PathVariable Integer id) throws ServicioException{
		List <Lectura> lecturas = servicioLectura.buscarLecturasUsuario(id);
		return lecturas;
	}
	
	@GetMapping("/listadoLecturasEstado/{idUsuario}")
	public List <Lectura> listarLecturasPorEstado(@PathVariable Integer idUsuario,@RequestParam Integer idEstado) throws ServicioException{
		List <Lectura> lecturas = servicioLectura.buscarLecturasEstadoUsuario(idUsuario, idEstado);
		return lecturas;
	}
	
	@GetMapping("/mediaPuntuacionLibro/{idLibro}")
	public Float mediaPuntuacion(@PathVariable Integer idLibro) throws ServicioException{
		Float mediaLectura = servicioLectura.mediaLectura(idLibro);
		return mediaLectura;
	}

}
