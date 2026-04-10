package com.atrium.gobooks.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Date;
import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.atrium.gobooks.dto.PasswordDTO;
import com.atrium.gobooks.entities.Rol;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.security.SecurityConfig;
import com.atrium.gobooks.services.ServicioUsuario;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(UsuarioController.class)
@Import(SecurityConfig.class)
public class UsuarioControllerTest {
	
	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ServicioUsuario servicioUsuario;

	@Autowired
	private ObjectMapper objectMapper;

	private Usuario usuario;

	@BeforeEach
	void iniciarDatos() {
		usuario = new Usuario();
		usuario.setId(1);
		usuario.setNombre("Usuario");
		usuario.setApellido("Prueba");
		usuario.setUsername("usuario@prueba.com");
		usuario.setPassword("123456");
		usuario.setFechaNacimiento(Date.valueOf(LocalDate.now()));
		Rol rol = new Rol();
		rol.setId(2);
		usuario.setRol(rol);
		
	}
	
	@Test
	@WithMockUser(authorities = "Usuario")
	public void mostrarUsuarioTest() throws Exception {
		when(servicioUsuario.conseguirUsuario(1)).thenReturn(usuario);
		
		mockMvc.perform(get("/api/usuario/1")
				.with(csrf()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1))
				.andExpect(jsonPath("$.nombre").value("Usuario"));
	}
	
	@Test
	@WithMockUser(authorities = "Administrador")
	public void mostrarAdminitradorTest() throws Exception {
		when(servicioUsuario.conseguirUsuario(1)).thenReturn(usuario);
		
		mockMvc.perform(get("/api/usuario/1")
				.with(csrf()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1))
				.andExpect(jsonPath("$.nombre").value("Usuario"));
	}
	
	@Test
	@WithMockUser(authorities = "Usuario")
	public void actualizarUsuarioTest() throws Exception {
		Integer idUsuario = 1;
		usuario.setNombre("Usuaria");
		
		when(servicioUsuario.modificar(any(Usuario.class))).thenReturn(usuario);
		
		mockMvc.perform(put("/api/usuario/{id}", idUsuario)
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(usuario)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(idUsuario))
				.andExpect(jsonPath("$.nombre").value("Usuaria"));
				
	}
	
	@Test
	@WithMockUser(authorities = "Usuario")
	public void actualizarPasswordUsuarioTest() throws Exception {
		Integer idUsuario = 1;
		String nuevoPassword = "654321";
		
		PasswordDTO passwordDTO = new PasswordDTO();
		passwordDTO.setPassword(nuevoPassword);
		
		usuario.setPassword(nuevoPassword);
		
		when(servicioUsuario.modificarPassword(passwordDTO.getPassword(), idUsuario)).thenReturn(usuario);
		
		mockMvc.perform(put("/api/usuario/cambiarPassword/{id}", idUsuario)
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(passwordDTO)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(idUsuario))
				.andExpect(jsonPath("$.password").value("654321"));
				
	}
	
	@Test
	@WithMockUser(authorities = "Usuario")
	public void eliminarTest() throws Exception {
		mockMvc.perform(delete("/api/usuario/1")
				.with(csrf()))
				.andExpect(status().isOk());
	}

}
