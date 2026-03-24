package com.atrium.gobooks.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.atrium.gobooks.entities.Genero;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class GeneroRepositoryTest {
	
	@Autowired
	private GeneroRepository generoRepository;
	
	@Test
	public void findByNameGeneroTest() {
		Genero genero = new Genero();
		genero.setNombre("Genero de Prueba");
		generoRepository.saveAndFlush(genero);
		
		Genero encontrado = generoRepository.findByName("Genero de Prueba");
		assertThat(encontrado).isNotNull();
		assertThat(encontrado.getNombre()).isEqualTo("Genero de Prueba");
		
		
	}

}
