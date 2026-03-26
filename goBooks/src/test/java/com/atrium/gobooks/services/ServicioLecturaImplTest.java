package com.atrium.gobooks.services;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.atrium.gobooks.dto.LecturaDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.entities.Rol;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.AutorRepository;
import com.atrium.gobooks.repositories.EditorialRepository;
import com.atrium.gobooks.repositories.GeneroRepository;
import com.atrium.gobooks.repositories.LecturaRepository;
import com.atrium.gobooks.repositories.LibroRepository;
import com.atrium.gobooks.repositories.UsuarioRepository;

import jakarta.persistence.EntityManager;

@SpringBootTest
@Transactional
public class ServicioLecturaImplTest {
	
	@Autowired
	private ServicioLecturaImpl servicioLectura;
	
	@Autowired
	private LecturaRepository lecturaRepositiry;
	
	@Autowired
	private UsuarioRepository usuarioRepositry;
	
	@Autowired
	private LibroRepository libroRepository;
	
	@Autowired
	private AutorRepository autorRepository;
	
	@Autowired
	private EditorialRepository editorialRepository;
	
	@Autowired
	private GeneroRepository generoRepository;
	
	@Autowired
	private EntityManager entityManager;
	
	private Usuario usuario;
	private Libro libro;
	private Estado estado;
	
	@BeforeEach
	public void iniciarDatos() {
		Rol rol = new Rol();
		rol.setId(2);
		usuario = usuarioRepositry.save(new Usuario(null, null, "usuario@prueba.com", "123456", null, rol));
		
		Autor autor = autorRepository.save(new Autor("Autor de prueba"));
		Editorial editorial = editorialRepository.save(new Editorial("Editorial de prueba"));
		Genero genero = generoRepository.save(new Genero("Género de prueba"));
		
		libro = libroRepository.save(new Libro("Libro de prueba", autor, null, editorial, null, null, genero));
		estado = new Estado();
		estado.setId(2);

		entityManager.flush();
	}
	
	@Test
	public void grabarLecturaTest() throws ServicioException {
		LecturaDTO dto = new LecturaDTO();
		dto.setIdUsuario(usuario.getId());
		dto.setIdLibro(libro.getId());
		dto.setIdEstado(estado.getId());
		dto.setPuntuacion(5.0F);
		
		Lectura guardada = servicioLectura.grabarLectura(dto);
		
		assertThat(guardada).isNotNull();
		assertThat(guardada.getPuntuacion()).isEqualTo(5.0F);
		assertThat(guardada.getUsuario().getId()).isEqualTo(usuario.getId());
	}
	

}
