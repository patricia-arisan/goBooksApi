package com.atrium.gobooks.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.entities.Usuario;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class LecturaRepositoryTest {
	
	@Autowired
	private LecturaRepository lecturaRepository;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	public void buscarLecturaUsuarioTest() {
		Usuario usuario = new Usuario();
		usuario.setUsername("usuario@prueba.com");
		usuario.setPassword("123456");
		entityManager.persist(usuario);
		
		Libro libro = new Libro();
		libro.setNombre("Libro de Prueba");
		entityManager.persist(libro);
		
		Estado estado = new Estado();
		estado.setId(3);
		
		Lectura lectura = new Lectura();
		lectura.setUsuario(usuario);
		lectura.setLibro(libro);
		lectura.setEstado(estado);
		lecturaRepository.save(lectura);
		
		Lectura encontrada = lecturaRepository.buscarLecturaUsuario(libro.getId(), usuario.getId());
		assertThat(encontrada).isNotNull();
		assertThat(encontrada.getLibro().getNombre()).isEqualTo("Libro de Prueba");
		assertThat(encontrada.getUsuario().getUsername()).isEqualTo("usuario@prueba.com");
	}

}
