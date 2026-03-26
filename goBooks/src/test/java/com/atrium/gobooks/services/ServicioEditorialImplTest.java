package com.atrium.gobooks.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.EditorialRepository;

import jakarta.persistence.EntityManager;

@SpringBootTest
@Transactional
public class ServicioEditorialImplTest {
	
	@Autowired
	private ServicioEditorialImpl servicioEditorial;
	
	@Autowired
	private EditorialRepository editorialRepository;
	
	@Autowired
	private EntityManager entityManager;
	
	@Test
	public void guardarEditorialTest() throws ServicioException {
		Editorial editorial = new Editorial();
		editorial.setNombre(" editorial de prueba ");
		
		Editorial guardada = servicioEditorial.guardarEditorial(editorial);
		
		assertThat(guardada).isNotNull();
		assertThat(guardada.getNombre()).isEqualTo("Editorial de prueba");
	}
	
	@Test
	public void guardarEditorialDuplicadaTest() {
		editorialRepository.save(new Editorial("Editorial duplicada"));
		
		Editorial duplicada = new Editorial(" editorial duplicada ");
		
		ServicioException se = assertThrows(ServicioException.class, () -> {
			servicioEditorial.guardarEditorial(duplicada);
		});
		
		assertThat(se.getCodigo()).isEqualTo(CodigoError.EDITORIAL_FOUND);
		
	}
	
	@Test
	public void modificarEditorialTest() throws ServicioException {
		Editorial inicial = editorialRepository.save(new Editorial("Editorial inicial"));		
		inicial.setNombre(" editorial modificada ");
		
		Editorial modificada = servicioEditorial.modificarEditorial(inicial);
		
		entityManager.flush();
		entityManager.clear();
		
		assertThat(modificada.getNombre()).isEqualTo("Editorial modificada"); 
        assertThat(editorialRepository.findById(inicial.getId())).isPresent();
	}
	
	@Test
	public void obtenerEditorialTest() throws ServicioException {
		Editorial editorial = editorialRepository.save(new Editorial("Editorial a buscar"));
		Integer id = editorial.getId();
		
		Editorial busqueda = servicioEditorial.obtenerEditorial(id);
		
		assertThat(busqueda).isNotNull();
		assertThat(busqueda.getNombre()).isEqualTo("Editorial a buscar");
	}
	
	@Test
	public void eliminarEditorialTest() throws ServicioException {
		Editorial editorial = editorialRepository.save(new Editorial("Editorial temporal"));
		Integer id = editorial.getId();
		
		servicioEditorial.eliminarEditorial(id);
		
		entityManager.flush();
		
		assertThat(editorialRepository.findById(id)).isEmpty();
	}

}
