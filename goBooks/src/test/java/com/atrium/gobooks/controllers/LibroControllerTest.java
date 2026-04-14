package com.atrium.gobooks.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.security.SecurityConfig;
import com.atrium.gobooks.services.ServicioLibro;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(LibroController.class)
@Import(SecurityConfig.class)
public class LibroControllerTest {
	
	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ServicioLibro servicioLibro;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private Libro libro;
	
	@BeforeEach
	void iniciarDatos() {
		libro = new Libro();
		libro.setId(1);
		libro.setNombre("Libro de prueba");
		Autor autor = new Autor();
		autor.setId(4);
		libro.setAutor(autor);
		Editorial editorial = new Editorial();
		editorial.setId(2);
		libro.setEditorial(editorial);	
		Genero genero = new Genero();
		genero.setId(3);
		libro.setGenero(genero);
		libro.setIsbn("00000000000");
		libro.setPortada("imagen.png");
		libro.setSinopsis("Resumen de la historia del libro");
	}
	
	@Test
	@WithMockUser(authorities = "Administrador")
	public void registrarNuevoLibroTest() throws Exception {
		when(servicioLibro.guardarLibro(any(Libro.class))).thenReturn(libro);
		
		mockMvc.perform(post("/api/libro/registroLibro")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(libro)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.nombre").value("Libro de prueba"));
		
	}
	
	@Test
	@WithMockUser(authorities = "Usuario")
	public void registrarNuevoLibroNoAdminTest() throws Exception {
		when(servicioLibro.guardarLibro(any(Libro.class))).thenReturn(libro);
		
		mockMvc.perform(post("/api/libro/registroLibro")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(libro)))
				.andExpect(status().isForbidden());
		
	}
	
	@Test
	@WithMockUser
	public void listarLibrosTest() throws Exception {
		List<Libro> libros = new ArrayList<Libro>();
		libros.add(libro);
		
		when(servicioLibro.buscarLibrosPorOrdenAlfabetico()).thenReturn(libros);
		
		mockMvc.perform(get("/api/libro/listadoLibros"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Libro de prueba"));
	}
	
	@Test
	@WithMockUser
	public void paginaFichaLibroTest() throws Exception {
		when(servicioLibro.obtenerLibro(1)).thenReturn(libro);
		
		mockMvc.perform(get("/api/libro/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1));
	}
	
	@Test
	@WithMockUser
	public void librosCategoriaTest() throws Exception {
		List<Libro> librosGenero = new ArrayList<Libro>();
		librosGenero.add(libro);
		
		when(servicioLibro.buscarLibrosPorGeneroId(3)).thenReturn(librosGenero);
		
		mockMvc.perform(get("/api/libro/categoria/3"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Libro de prueba"));
	}
	
	@Test
	@WithMockUser
	public void librosAutorTest() throws Exception {
		List<Libro> librosAutor = new ArrayList<Libro>();
		librosAutor.add(libro);
		
		when(servicioLibro.buscarLibrosPorAutorId(4)).thenReturn(librosAutor);
		
		mockMvc.perform(get("/api/libro/autor/4"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Libro de prueba"));
	}
	
	@Test
	@WithMockUser
	public void librosEditorialTest() throws Exception {
		List<Libro> librosEditorial = new ArrayList<Libro>();
		librosEditorial.add(libro);
		
		when(servicioLibro.buscarLibrosPorEditorialId(2)).thenReturn(librosEditorial);
		
		mockMvc.perform(get("/api/libro/editorial/2"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Libro de prueba"));
	}
	
	@Test
	@WithMockUser
	public void listarUltimosLibrosTest() throws Exception {
		List<Libro> librosUltimos = new ArrayList<Libro>();
		librosUltimos.add(libro);
		
		when(servicioLibro.buscarUltimosLibrosIncorporados()).thenReturn(librosUltimos);
		
		mockMvc.perform(get("/api/libro/ultimosLibros"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Libro de prueba"));
	}
	
	@Test
	@WithMockUser
	public void listarUltimosLibrosCompletoTest() throws Exception {
		List<Libro> librosUltimosCompleta = new ArrayList<Libro>();
		librosUltimosCompleta.add(libro);
		
		when(servicioLibro.buscarTodosUltimosLibrosIncorporados()).thenReturn(librosUltimosCompleta);
		
		mockMvc.perform(get("/api/libro/listaUltimosLibros"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Libro de prueba"));
	}
	
	@Test
	@WithMockUser
	public void listarLibrosPuntuacionTest() throws Exception {
		List<Libro> librosPuntuacion = new ArrayList<Libro>();
		librosPuntuacion.add(libro);
		
		when(servicioLibro.listaLibrosMayorPuntuacion()).thenReturn(librosPuntuacion);
		
		mockMvc.perform(get("/api/libro/puntuacionLibros"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Libro de prueba"));
	}

	@Test
	@WithMockUser
	public void librosMejorPuntuacionTest() throws Exception {
		List<Libro> librosMejorPuntuacion = new ArrayList<Libro>();
		librosMejorPuntuacion.add(libro);
		
		when(servicioLibro.librosMayorPuntuacion()).thenReturn(librosMejorPuntuacion);
		
		mockMvc.perform(get("/api/libro/mejorPuntuacionLibros"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Libro de prueba"));
	}
	
	@Test
	@WithMockUser
	public void mostrarLibrosTest() throws Exception {
		List<Libro> librosResultados = new ArrayList<Libro>();
		librosResultados.add(libro);
		
		when(servicioLibro.busquedaLibros("prueba")).thenReturn(librosResultados);
		
		mockMvc.perform(get("/api/libro/resultadosBusqueda")
				.param("clave", "prueba"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].nombre").value("Libro de prueba"));
	}
	
	@Test
	@WithMockUser(authorities = "Administrador")
	public void actualizarLibroTest() throws Exception {
		Integer idLibro = 1;
		libro.setNombre("Libro actualizado");
		
		when(servicioLibro.modificarLibro(any(Libro.class))).thenReturn(libro);

		mockMvc.perform(put("/api/libro/{id}", idLibro)
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(libro)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(idLibro))
				.andExpect(jsonPath("$.nombre").value("Libro actualizado"));
	}
	
	@Test
	@WithMockUser(authorities = "Administrador")
	public void eliminarLibroTest() throws Exception {
		mockMvc.perform(delete("/api/libro/1")
				.with(csrf()))
				.andExpect(status().isOk());

	}
}
