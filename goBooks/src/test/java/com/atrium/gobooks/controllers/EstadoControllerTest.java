package com.atrium.gobooks.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.services.ServicioEstado;

@WebMvcTest(EstadoController.class)
public class EstadoControllerTest {
	
	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ServicioEstado servicioEstado;

	private Estado estado;

	@BeforeEach
	void iniciarDatos() {
		estado = new Estado();
		estado.setId(1);
		estado.setSituacion("Estado Prueba");
	}
	
	@Test
	@WithMockUser
	public void listarEstadosTest() throws Exception {
		List<Estado> estados = new ArrayList<Estado>();
		estados.add(estado);

		when(servicioEstado.listaEstados()).thenReturn(estados);

		mockMvc.perform(get("/api/estado/listadoEstados"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].situacion").value("Estado Prueba"));
	}

}
