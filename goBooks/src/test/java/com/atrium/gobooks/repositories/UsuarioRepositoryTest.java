package com.atrium.gobooks.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.atrium.gobooks.entities.Usuario;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UsuarioRepositoryTest {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Test
	public void findByUsernameTest() {
		Usuario usuario = new Usuario();
		usuario.setUsername("usuario@prueba.com");
		usuario.setPassword("123456");
		usuarioRepository.saveAndFlush(usuario);
		
		Usuario encontrado = usuarioRepository.findByUsername("usuario@prueba.com");
		assertThat(encontrado).isNotNull();
		assertThat(encontrado.getUsername()).isEqualTo("usuario@prueba.com");
	}

}
