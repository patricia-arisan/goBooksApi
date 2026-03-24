package com.atrium.gobooks.repositories;

import static org.assertj.core.api.Assertions.assertThat;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.atrium.gobooks.entities.Autor;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class AutorRepositoryTest {
	
	@Autowired
	private AutorRepository autorRepository;

	
	@Test
	public void findByNameAutorTest() {
		Autor autor = new Autor();
		autor.setNombre("Autor de Prueba");
		autorRepository.saveAndFlush(autor);
		
		Autor encontrado = autorRepository.findByName("Autor de Prueba");
		assertThat(encontrado).isNotNull();
		assertThat(encontrado.getNombre()).isEqualTo("Autor de Prueba");
		
	}

}
