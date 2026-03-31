package com.atrium.gobooks.services;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.AutorRepository;
import com.atrium.gobooks.repositories.EditorialRepository;
import com.atrium.gobooks.repositories.GeneroRepository;

@SpringBootTest
@Transactional
public class ServicioLibroImplTest {

	@Autowired
	private ServicioLibroImpl servicioLibro;
	
	@Autowired
	private AutorRepository autorRepository;
	
	@Autowired
	private EditorialRepository editorialRepository;
	
	@Autowired
	private GeneroRepository generoRepository;
	
	@Test
	public void guardarLibroTest() throws ServicioException {
		Libro libro = new Libro();
		libro.setNombre(" libro de prueba ");
		Autor autor = autorRepository.save(new Autor("Autor de prueba"));
		libro.setAutor(autor);
		Editorial editorial = editorialRepository.save(new Editorial("Editorial de prueba"));
		libro.setEditorial(editorial);
		Genero genero = generoRepository.save(new Genero("Género de prueba"));
		libro.setGenero(genero);
		libro.setIsbn(null);
		libro.setPortada("imagen.png");
		libro.setSinopsis(null);
		
		Libro guardado = servicioLibro.guardarLibro(libro);
		
		assertThat(guardado).isNotNull();
		assertThat(guardado.getNombre()).isEqualTo("Libro de prueba");
	}
}
