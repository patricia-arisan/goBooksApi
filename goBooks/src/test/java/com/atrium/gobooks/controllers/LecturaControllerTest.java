package com.atrium.gobooks.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.atrium.gobooks.dto.LecturaDTO;
import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.services.ServicioLectura;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(LecturaController.class)
public class LecturaControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ServicioLectura servicioLectura;

	@Autowired
	private ObjectMapper objectMapper;

	private Lectura lectura;
	private LecturaDTO lecturaDTO;
	
	@BeforeEach
	void iniciarDatos() {
		
		Estado estado = new Estado();
		estado.setId(2);
		estado.setSituacion("Leído");

	    Libro libro = new Libro();
	    libro.setId(1);
	    libro.setNombre("Libro prueba");
	
	    Usuario usuario = new Usuario();
	    usuario.setId(1);
	    usuario.setUsername("usuario@prueba.com");
	    usuario.setPassword("123456");
	    
	    lectura = new Lectura();
	    lectura.setId(1);
	    lectura.setPuntuacion(4f);
	    lectura.setEstado(estado);
	    lectura.setLibro(libro);
	    lectura.setUsuario(usuario);
	    
	    lecturaDTO = new LecturaDTO();
	    lecturaDTO.setIdLibro(1);
	    lecturaDTO.setIdUsuario(1);
	    lecturaDTO.setIdEstado(2);
	    lecturaDTO.setPuntuacion(4f);
	}
	
	@Test
	@WithMockUser(authorities = "Usuario")
	public void registrarNuevaLecturaTest() throws Exception {
		when(servicioLectura.grabarLectura(any(LecturaDTO.class))).thenReturn(lectura);

		mockMvc.perform(post("/api/lectura/registroLectura")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(lecturaDTO)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1));

	}
}
