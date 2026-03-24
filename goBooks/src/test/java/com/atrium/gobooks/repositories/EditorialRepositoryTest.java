package com.atrium.gobooks.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.atrium.gobooks.entities.Editorial;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class EditorialRepositoryTest {
	
	@Autowired
	private EditorialRepository editorialRepository;
	
	@Test
	public void findByNameEditorialTest() {
		Editorial editorial = new Editorial();
		editorial.setNombre("Editorial de Prueba");
		editorialRepository.saveAndFlush(editorial);
		
		Editorial encontrada = editorialRepository.findByName("Editorial de Prueba");
		assertThat(encontrada).isNotNull();
		assertThat(encontrada.getNombre()).isEqualTo("Editorial de Prueba");
	}	

}
