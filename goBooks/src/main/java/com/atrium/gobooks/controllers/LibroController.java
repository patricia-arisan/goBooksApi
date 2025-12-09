package com.atrium.gobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ErrorResponse;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioLibro;

@RestController
@RequestMapping("/api/libro")
public class LibroController {

	@Autowired
	private ServicioLibro servicioLibro;
	
	@PreAuthorize("hasAuthority('Administrador')")
	@PostMapping(value="/registroLibro")
	public ResponseEntity<Object> registrarNuevoLibro(@RequestBody Libro libro) throws ServicioException {
		Libro libroResponse = null;
		try {
			libroResponse = servicioLibro.guardarLibro(libro);
		} catch(ServicioException e) {
			String codigo = "";
			String mensaje = "";
			if(e.getCodigo().equals(CodigoError.LIBRO_FOUND)) {
				codigo = CodigoError.LIBRO_FOUND;
				mensaje = "El libro ya existe";
			} else if(e.getCodigo().equals(CodigoError.ISBN_FOUND)) {
				codigo = CodigoError.ISBN_FOUND;
				mensaje = "El isbn ya existe";
			}
			ErrorResponse errorResponse = new ErrorResponse(codigo, mensaje);
			return ResponseEntity.badRequest().body(errorResponse);
		}
		return ResponseEntity.ok(libroResponse);
		 
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
	
	@GetMapping("/categoria/{id}")
	public List <Libro> librosCategoria(@PathVariable Integer id) throws Exception {
		List<Libro> libros = servicioLibro.buscarLibrosPorGeneroId(id);
		return libros;
	}
	
	@GetMapping("/autor/{id}")
	public List <Libro> librosAutor(@PathVariable Integer id) throws Exception {
		List<Libro> libros = servicioLibro.buscarLibrosPorAutorId(id);
		return libros;
	}
	
	@GetMapping("/editorial/{id}")
	public List <Libro> librosEditorial(@PathVariable Integer id) throws Exception {
		List<Libro> libros = servicioLibro.buscarLibrosPorEditorialId(id);
		return libros;
	}
	
	@GetMapping("/ultimosLibros")
	public List <Libro> listarUltimosLibros() throws ServicioException{
		List <Libro> libros = servicioLibro.buscarUltimosLibrosIncorporados();
		return libros;
	}
	
	@GetMapping("/listaUltimosLibros")
	public List <Libro> listarUltimosLibrosCompleto() throws ServicioException{
		List <Libro> libros = servicioLibro.buscarTodosUltimosLibrosIncorporados();
		return libros;
	}
	
	@GetMapping("/puntuacionLibros")
	public List <Libro> listarLibrosPuntuacion() throws ServicioException{
		List <Libro> libros = servicioLibro.listaLibrosMayorPuntuacion();
		return libros;
	}
	
	@GetMapping("/mejorPuntuacionLibros")
	public List <Libro> librosMejorPuntuacion() throws ServicioException{
		List <Libro> libros = servicioLibro.librosMayorPuntuacion();
		return libros;
	}
	
	@GetMapping("/resultadosBusqueda")
	public List<Libro> mostrarLibros(@RequestParam String clave) throws ServicioException {
		List<Libro> libros=servicioLibro.busquedaLibros(clave);
		
		
		
		return libros;
		
	}
	
	@PreAuthorize("hasAuthority('Administrador')")
	@PutMapping(value="/{id}")
	public Libro actualizarLibro(@PathVariable Integer id, @RequestBody Libro libro) throws ServicioException {
		return servicioLibro.modificarLibro(libro);
	}
	
	@PreAuthorize("hasAuthority('Administrador')")
	@DeleteMapping(value="/{id}") 
	public ResponseEntity<?> eliminarLibro(@PathVariable Integer id) throws Exception{
		servicioLibro.eliminarLibro(id);
		return ResponseEntity.ok().build();
	}
	
	
	
	
	
	
	
}
