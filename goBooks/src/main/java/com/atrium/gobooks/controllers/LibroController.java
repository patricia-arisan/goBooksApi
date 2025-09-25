package com.atrium.gobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Lectura;
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

	@PutMapping(value="/{id}")
	public Libro actualizarLibro(@PathVariable Integer id, @RequestBody Libro libro) throws ServicioException {
		return servicioLibro.modificarLibro(libro);
	}
	
}
