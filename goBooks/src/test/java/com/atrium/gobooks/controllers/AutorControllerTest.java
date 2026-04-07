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

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.security.SecurityConfig;
import com.atrium.gobooks.services.ServicioAutor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(AutorController.class)
@Import(SecurityConfig.class)
public class AutorControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ServicioAutor servicioAutor;

	@Autowired
	private ObjectMapper objectMapper;

	private Autor autor;

	@BeforeEach
	void iniciarDatos() {
		autor = new Autor();
		autor.setId(1);
		autor.setNombre("Autor Prueba");
	}

	@Test
	@WithMockUser(authorities = "Administrador")
	public void registrarNuevoAutorTest() throws JsonProcessingException, Exception {
		when(servicioAutor.guardarAutor(any(Autor.class))).thenReturn(autor);

		mockMvc.perform(post("/api/autor/registroAutor")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(autor)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.nombre").value("Autor Prueba"));

	}

	@Test
	@WithMockUser(authorities = "Usuario")
	void registrarNuevoAutorNoAdminTest() throws Exception {
		mockMvc.perform(post("/api/autor/registroAutor")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(autor)))
				.andExpect(status().isForbidden());
	}

	@Test
	@WithMockUser
	public void listarAutoresTest() throws Exception {
		List<Autor> autores = new ArrayList<Autor>();
		autores.add(autor);

		when(servicioAutor.buscarAutoresPorOrdenAlfabetico()).thenReturn(autores);

		mockMvc.perform(get("/api/autor/listadoAutores"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Autor Prueba"));
	}

	@Test
	@WithMockUser(authorities = "Administrador")
	public void actualizarAutorTest() throws Exception {
		Integer idAutor = 1;
		autor.setNombre("Autor Actualizado");

		when(servicioAutor.modificarAutor(any(Autor.class))).thenReturn(autor);

		mockMvc.perform(put("/api/autor/{id}", idAutor)
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(autor)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(idAutor))
				.andExpect(jsonPath("$.nombre").value("Autor Actualizado"));

	}

	@Test
	@WithMockUser
	public void buscarAutorTest() throws Exception {
		when(servicioAutor.obtenerAutor(1)).thenReturn(autor);

		mockMvc.perform(get("/api/autor/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1));

	}

	@Test
	@WithMockUser(authorities = "Administrador")
	public void eliminarAutorTest() throws Exception {
		mockMvc.perform(delete("/api/autor/1")
				.with(csrf()))
				.andExpect(status().isOk());

	}

	@Test
	@WithMockUser
	public void conteoLibrosAutorTest() throws Exception {
		AutorDTO autorDTO = new AutorDTO();
		autorDTO.setIdAutor(1);
		autorDTO.setNombre("Autor Libros");
		autorDTO.setNumeroLibros(6L);

		List<AutorDTO> autoresLibros = new ArrayList<AutorDTO>();
		autoresLibros.add(autorDTO);

		when(servicioAutor.numeroLibrosAutor()).thenReturn(autoresLibros);

		mockMvc.perform(get("/api/autor/conteoLibros")).andExpect(status().isOk())
				.andExpect(jsonPath("$.length()").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Autor Libros"))
				.andExpect(jsonPath("$[0].numeroLibros").value(6));
	}
	
}
