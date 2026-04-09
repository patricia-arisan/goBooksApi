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

import com.atrium.gobooks.dto.GeneroDTO;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.security.SecurityConfig;
import com.atrium.gobooks.services.ServicioGenero;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(GeneroController.class)
@Import(SecurityConfig.class)
public class GeneroControllerTest {
	
	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ServicioGenero servicioGenero;

	@Autowired
	private ObjectMapper objectMapper;

	private Genero genero;

	@BeforeEach
	void iniciarDatos() {
		genero = new Genero();
		genero.setId(1);
		genero.setNombre("Genero Prueba");
	}

	@Test
	@WithMockUser(authorities = "Administrador")
	public void registrarNuevoGeneroTest() throws Exception {
		when(servicioGenero.guardarGenero(any(Genero.class))).thenReturn(genero);

		mockMvc.perform(post("/api/genero/registroGenero")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(genero)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.nombre").value("Genero Prueba"));

	}

	@Test
	@WithMockUser(authorities = "Usuario")
	void registrarNuevoGeneroNoAdminTest() throws Exception {
		mockMvc.perform(post("/api/genero/registroGenero")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(genero)))
				.andExpect(status().isForbidden());
	}

	@Test
	@WithMockUser
	public void listarGenerosTest() throws Exception {
		List<Genero> generos = new ArrayList<Genero>();
		generos.add(genero);

		when(servicioGenero.buscarGenerosPorOrdenAlfabetico()).thenReturn(generos);

		mockMvc.perform(get("/api/genero/listadoGeneros"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Genero Prueba"));
	}

	@Test
	@WithMockUser(authorities = "Administrador")
	public void actualizarGeneroTest() throws Exception {
		Integer idGenero = 1;
		genero.setNombre("Genero Actualizado");

		when(servicioGenero.modificarGenero(any(Genero.class))).thenReturn(genero);

		mockMvc.perform(put("/api/genero/{id}", idGenero)
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(genero)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(idGenero))
				.andExpect(jsonPath("$.nombre").value("Genero Actualizado"));

	}

	@Test
	@WithMockUser
	public void buscarGeneroTest() throws Exception {
		when(servicioGenero.obtenerGenero(1)).thenReturn(genero);

		mockMvc.perform(get("/api/genero/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1));

	}

	@Test
	@WithMockUser(authorities = "Administrador")
	public void eliminarGeneroTest() throws Exception {
		mockMvc.perform(delete("/api/genero/1")
				.with(csrf()))
				.andExpect(status().isOk());

	}

	@Test
	@WithMockUser
	public void conteoLibrosGeneroTest() throws Exception {
		GeneroDTO generoDTO = new GeneroDTO();
		generoDTO.setIdGenero(1);
		generoDTO.setNombre("Genero Libros");
		generoDTO.setNumeroLibros(6L);

		List<GeneroDTO> generosLibros = new ArrayList<GeneroDTO>();
		generosLibros.add(generoDTO);

		when(servicioGenero.numeroLibrosGenero()).thenReturn(generosLibros);

		mockMvc.perform(get("/api/genero/conteoLibros")).andExpect(status().isOk())
				.andExpect(jsonPath("$.length()").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Genero Libros"))
				.andExpect(jsonPath("$[0].numeroLibros").value(6));
	}

}
