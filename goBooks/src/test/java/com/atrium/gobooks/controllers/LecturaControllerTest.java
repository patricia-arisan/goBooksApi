package com.atrium.gobooks.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

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
	
	@Test
	@WithMockUser(authorities ="Usuario")
	public void mostrarLecturaTest() throws Exception {		
		Integer idLibro = 1;
		Integer idUsuario = 1;
		when(servicioLectura.buscarLecturaUsuario(idLibro, idUsuario)).thenReturn(lectura);
		
		mockMvc.perform(get("/api/lectura/1")				
				.param("idLibro",idLibro.toString()))		
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1));
	}
	
	@Test
	@WithMockUser(authorities ="Usuario")
	public void actualizarLecturaTest() throws Exception {
		Integer idLectura = 1;
		Estado estado = new Estado();
		estado.setId(3);
		estado.setSituacion("Pendiente");
		lectura.setEstado(estado);
		
		when(servicioLectura.modificarLectura(any(Lectura.class))).thenReturn(lectura);
		
		mockMvc.perform(put("/api/lectura/{id}", idLectura)
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(lectura)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(idLectura))
				.andExpect(jsonPath("$.estado.id").value(3));
	}
	
	@Test
	@WithMockUser(authorities ="Usuario")
	public void eliminarLecturaTest() throws Exception {
		mockMvc.perform(delete("/api/lectura/1")
				.with(csrf()))
				.andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(authorities ="Usuario")
	public void listarLecturasTest() throws Exception {
		List<Lectura> lecturas = new ArrayList<Lectura>();
		lecturas.add(lectura);
		
		Integer idUsuario = 1;
		
		when(servicioLectura.buscarLecturasUsuario(idUsuario)).thenReturn(lecturas);
		
		mockMvc.perform(get("/api/lectura/listadoLecturas/{id}",idUsuario))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$.length()").value(1));
			
	}
	
	@Test
	@WithMockUser(authorities ="Usuario")
	public void listarLecturasPorEstadoTest() throws Exception {
		List<Lectura> lecturas = new ArrayList<Lectura>();
		lecturas.add(lectura);
		
		Integer idUsuario = 1;
		Integer idEstado = 2;
		
		when(servicioLectura.buscarLecturasEstadoUsuario(idUsuario,idEstado)).thenReturn(lecturas);
		
		mockMvc.perform(get("/api/lectura/listadoLecturasEstado/{idUsuario}",idUsuario)
				.param("idEstado",idEstado.toString()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$.length()").value(1));
	}
	
	@Test
	@WithMockUser
	public void mediaPuntuacionTest() throws Exception {
		when(servicioLectura.mediaLectura(1)).thenReturn(4f);

        mockMvc.perform(get("/api/lectura/mediaPuntuacionLibro/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("4.0"));
	}
	
}
