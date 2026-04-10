package com.atrium.gobooks.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
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
		libro.setNombre(" libro de prueba ");
		Autor autor = new Autor();
		autor.setId(4);
		libro.setAutor(autor);
		Editorial editorial = new Editorial();
		editorial.setId(2);
		libro.setEditorial(editorial);	
		Genero genero = new Genero();
		genero.setId(3);
		libro.setGenero(genero);
		libro.setIsbn(" 00000000000 ");
		libro.setPortada("imagen.png");
		libro.setSinopsis(" Resumen de la historia del libro ");
	}

}
