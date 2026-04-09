package com.atrium.gobooks.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.atrium.gobooks.entities.Rol;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.security.SecurityConfig;
import com.atrium.gobooks.services.ServicioUsuario;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(LoginController.class)
@Import(SecurityConfig.class)
public class LoginControllerTest {
	
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
	public void registrarCuentaDeUsuarioTest() throws Exception {
		when(servicioUsuario.registrar(any(Usuario.class))).thenReturn(usuario);

		mockMvc.perform(post("/api/registroUsuario")
				.with(csrf())
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(usuario)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.nombre").value("Usuario"));

	}
	
	@Test
	@WithMockUser(username = "usuario@prueba.com")
	public void getCurrentUserTest() throws Exception {
		when(servicioUsuario.findByUsername("usuario@prueba.com")).thenReturn(Optional.of(usuario));
		
		mockMvc.perform(post("/api/login")
				.with(csrf()))
				.andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("usuario@prueba.com"));
	}
	
	@Test
    @WithMockUser(username = "usuarionoexiste@prueba.com")
    void getCurrentNosExistUserTest() throws Exception {
        
        when(servicioUsuario.findByUsername("usuarionoexiste@prueba.com")).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/login")
        		.with(csrf()))
                .andExpect(status().isBadRequest());
    }

}
