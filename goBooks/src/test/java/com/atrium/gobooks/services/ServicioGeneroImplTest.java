package com.atrium.gobooks.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.GeneroRepository;

import jakarta.persistence.EntityManager;

@SpringBootTest
@Transactional
public class ServicioGeneroImplTest {
	
	@Autowired
	private ServicioGeneroImpl servicioGenero;
	
	@Autowired
	private GeneroRepository generoRepository;
	
	@Autowired
	private EntityManager entityManager;
	
	@Test
	public void guardarGenreoTest() throws ServicioException {
		Genero genero = new Genero();
		genero.setNombre(" género de prueba ");
		
		Genero guardado = servicioGenero.guardarGenero(genero);
		
		assertThat(guardado).isNotNull();
		assertThat(guardado.getNombre()).isEqualTo("Género de prueba");
	}
	
	@Test
	public void guardarGenreoDuplicadoTest() throws ServicioException {
		generoRepository.save(new Genero("Género duplicado"));
		
		Genero duplicado = new Genero(" género duplicado ");
		
		ServicioException se = assertThrows(ServicioException.class, () -> {
            servicioGenero.guardarGenero(duplicado);
        });
		
		assertThat(se.getCodigo()).isEqualTo(CodigoError.GENERO_FOUND);
	}
	
	@Test
	public void modificarGeneroTest() throws ServicioException {
		Genero inicial = generoRepository.save(new Genero("Género Inicial"));
		
		inicial.setNombre(" género modificado ");
		
		Genero modificado = servicioGenero.modificarGenero(inicial);
		
		entityManager.flush();
		entityManager.clear();
		
		assertThat(modificado.getNombre()).isEqualTo("Género modificado"); 
        assertThat(generoRepository.findById(inicial.getId())).isPresent();
	}
	
	@Test
	public void eliminarGeneroTest() throws ServicioException {
		Genero genero = generoRepository.save(new Genero("Género temporal"));
		Integer id = genero.getId();
		
		servicioGenero.eliminarGenero(id);
		
		entityManager.flush();
		
		assertThat(generoRepository.findById(id)).isEmpty();
	}
	
	@Test
	public void obtenerGeneroTest() throws ServicioException {
		Genero genero = generoRepository.save(new Genero("Género a buscar"));
		Integer id = genero.getId();
		
		Genero busqueda = servicioGenero.obtenerGenero(id);
		
		assertThat(busqueda).isNotNull();
		assertThat(busqueda.getNombre()).isEqualTo("Género a buscar");
		
	}

}
