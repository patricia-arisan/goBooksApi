package com.atrium.gobooks.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.atrium.gobooks.entities.Libro;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class LibroRepositoryTest {
	
	@Autowired
	private LibroRepository libroRepository;
	
	@Test
	public void findByNameLibroTest() {
		Libro libro = new Libro();
		libro.setNombre("Libro de Prueba");
		libroRepository.saveAndFlush(libro);		
		
		Libro encontrado = libroRepository.findByName("Libro de Prueba");
		assertThat(encontrado).isNotNull();
		assertThat(encontrado.getNombre()).isEqualTo("Libro de Prueba");
	}
	
	@Test
	public void findByIsbnTest() {
		Libro libro = new Libro();
		libro.setNombre("Libro de Prueba");
		libro.setIsbn("0000000000000");
		libroRepository.saveAndFlush(libro);
		
		Libro encontrado = libroRepository.findByIsbn("0000000000000");
		assertThat(encontrado).isNotNull();
		assertThat(encontrado.getIsbn()).isEqualTo("0000000000000");
		
	}

}
