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

import com.atrium.gobooks.dto.EditorialDTO;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.security.SecurityConfig;
import com.atrium.gobooks.services.ServicioEditorial;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(EditorialController.class)
@Import(SecurityConfig.class)
public class EditorialControllerTest {
	
	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ServicioEditorial servicioEditorial;
	
	@Autowired
	private ObjectMapper objectMapper;

	private Editorial editorial;
	
	@BeforeEach
	void iniciarDatos() {
		editorial = new Editorial();
		editorial.setId(1);
		editorial.setNombre("Editorial Prueba");
	}
	
	@Test
	@WithMockUser(authorities = "Administrador")
	public void registrarNuevaEditorialTest() throws JsonProcessingException, Exception {
		when(servicioEditorial.guardarEditorial(any(Editorial.class))).thenReturn(editorial);

		mockMvc.perform(post("/api/editorial/registroEditorial")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(editorial)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.nombre").value("Editorial Prueba"));

	}
	
	@Test
	@WithMockUser(authorities = "Usuario")
	void registrarNuevaEditorialNoAdminTest() throws Exception {
		mockMvc.perform(post("/api/editorial/registroEditorial")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(editorial)))
				.andExpect(status().isForbidden());
	}
	
	@Test
	@WithMockUser
	public void listarEditorialesTest() throws Exception {
		List<Editorial> editoriales = new ArrayList<Editorial>();
		editoriales.add(editorial);

		when(servicioEditorial.buscarEditorialesPorOrdenAlfabetico()).thenReturn(editoriales);

		mockMvc.perform(get("/api/editorial/listadoEditoriales"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Editorial Prueba"));
	}
	
	@Test
	@WithMockUser(authorities = "Administrador")
	public void actualizarEditorialTest() throws Exception {
		Integer idEditorial = 1;
		editorial.setNombre("Editorial Actualizada");

		when(servicioEditorial.modificarEditorial(any(Editorial.class))).thenReturn(editorial);

		mockMvc.perform(put("/api/editorial/{id}", idEditorial)
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(editorial)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(idEditorial))
				.andExpect(jsonPath("$.nombre").value("Editorial Actualizada"));

	}
	
	@Test
	@WithMockUser
	public void buscarEditorialTest() throws Exception {
		when(servicioEditorial.obtenerEditorial(1)).thenReturn(editorial);

		mockMvc.perform(get("/api/editorial/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1));

	}
	
	@Test
	@WithMockUser(authorities = "Administrador")
	public void eliminarEditorialTest() throws Exception {
		mockMvc.perform(delete("/api/editorial/1")
				.with(csrf()))
				.andExpect(status().isOk());

	}
	
	@Test
	@WithMockUser
	public void conteoLibrosEditorialTest() throws Exception {
		EditorialDTO editorialDTO = new EditorialDTO();
		editorialDTO.setIdEditorial(1);
		editorialDTO.setNombre("Editorial Libros");
		editorialDTO.setNumeroLibros(6L);

		List<EditorialDTO> editorialesLibros = new ArrayList<EditorialDTO>();
		editorialesLibros.add(editorialDTO);

		when(servicioEditorial.numeroLibrosEditorial()).thenReturn(editorialesLibros);

		mockMvc.perform(get("/api/editorial/conteoLibros")).andExpect(status().isOk())
				.andExpect(jsonPath("$.length()").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Editorial Libros"))
				.andExpect(jsonPath("$[0].numeroLibros").value(6));
	}

}
