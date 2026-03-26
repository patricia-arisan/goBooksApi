package com.atrium.gobooks.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.AutorRepository;

import jakarta.persistence.EntityManager;

@SpringBootTest
@Transactional
public class ServicioAutorImplTest {
	
	@Autowired
	private ServicioAutorImpl servicioAutor;
	
	@Autowired
	private AutorRepository autorRepository;
	
	@Autowired
	private EntityManager entityManager;
	
	@Test
	public void guardarAutorTest() throws ServicioException {
		Autor autor = new Autor();
		autor.setNombre(" autor de prueba ");
		
		Autor guardado = servicioAutor.guardarAutor(autor);
		
		assertThat(guardado).isNotNull();
		assertThat(guardado.getNombre()).isEqualTo("Autor de prueba");
	}

	@Test
	public void guardarAutorDuplicadoTest() {
		autorRepository.save(new Autor("Autor Duplicado"));
		
		Autor duplicado = new Autor(" autor Duplicado ");
		
		ServicioException se = assertThrows(ServicioException.class, () -> {
            servicioAutor.guardarAutor(duplicado);
        });
		
		assertThat(se.getCodigo()).isEqualTo(CodigoError.AUTOR_FOUND);
	}
	
	@Test
	public void modificarAutorTest() throws ServicioException {
		Autor inicial = autorRepository.save(new Autor("Autor Inicial"));
		
		inicial.setNombre(" autor Modificado ");
		
		Autor modificado = servicioAutor.modificarAutor(inicial);
		
		entityManager.flush();
		entityManager.clear();
		
		assertThat(modificado.getNombre()).isEqualTo("Autor Modificado"); 
        assertThat(autorRepository.findById(inicial.getId())).isPresent();
	}
	
	@Test
	public void eliminarAutorTest() throws ServicioException {
		Autor autor = autorRepository.save(new Autor("Autor Temporal"));
		Integer id = autor.getId();
		
		servicioAutor.eliminarAutor(id);
		
		entityManager.flush();
		
		assertThat(autorRepository.findById(id)).isEmpty();
	}
	
	@Test
	public void obtenerAutorTest() throws ServicioException {
		Autor autor = autorRepository.save(new Autor("Autor a buscar"));
		Integer id = autor.getId();
		
		Autor busqueda = servicioAutor.obtenerAutor(id);
		
		assertThat(busqueda).isNotNull();
		assertThat(busqueda.getNombre()).isEqualTo("Autor a buscar");
		
	}
}
