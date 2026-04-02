package com.atrium.gobooks.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.AutorRepository;
import com.atrium.gobooks.repositories.EditorialRepository;
import com.atrium.gobooks.repositories.GeneroRepository;
import com.atrium.gobooks.repositories.LibroRepository;

import jakarta.persistence.EntityManager;

@SpringBootTest
@Transactional
public class ServicioLibroImplTest {

	@Autowired
	private ServicioLibroImpl servicioLibro;
	
	@Autowired
	private AutorRepository autorRepository;
	
	@Autowired
	private EditorialRepository editorialRepository;
	
	@Autowired
	private GeneroRepository generoRepository;
	
	@Autowired
	private LibroRepository libroRepository;
	
	@Autowired
	private EntityManager entityManager;
	
	private Autor autor;
	private Editorial editorial;
	private Genero genero;
	
	@BeforeEach
	public void iniciarDatos() {
		autor = autorRepository.save(new Autor("Autor de prueba"));
		editorial = editorialRepository.save(new Editorial("Editorial de prueba"));
		genero = generoRepository.save(new Genero("Género de prueba"));
		
		entityManager.flush();
		entityManager.clear();
	}
	
	@Test
	public void guardarLibroTest() throws ServicioException {
		Libro libro = new Libro();
		libro.setNombre(" libro de prueba ");
		libro.setAutor(autor);
		libro.setEditorial(editorial);		
		libro.setGenero(genero);
		libro.setIsbn(" 00000000000 ");
		libro.setPortada("imagen.png");
		libro.setSinopsis(" Resumen de la historia del libro ");
		
		Libro guardado = servicioLibro.guardarLibro(libro);
		
		assertThat(guardado).isNotNull();
		assertThat(guardado.getNombre()).isEqualTo("Libro de prueba");
		assertThat(guardado.getId()).isNotNull();
	}
	
	@Test
	public void guardarLibroDuplicadoTest() throws ServicioException {
		libroRepository.save(new Libro("Libro de prueba", autor, "000000", editorial, 
				"Resumen de la historia", "imagen.png", genero));
		
		Libro duplicado = new Libro();
		duplicado.setNombre(" libro de prueba ");
		duplicado.setAutor(autor);
		duplicado.setEditorial(editorial);
		duplicado.setGenero(genero);
		
		ServicioException se = assertThrows(ServicioException.class, () -> {
			servicioLibro.guardarLibro(duplicado);
		});
		
		assertThat(se.getCodigo()).isEqualTo(CodigoError.LIBRO_FOUND);
		
	}
	
	@Test
	public void obtenerLibroTest() throws ServicioException {
		Libro libro = libroRepository.save(new Libro("Libro de prueba", autor, "000000", editorial, 
				"Resumen de la historia", "imagen.png", genero));
		Integer id = libro.getId();
		
		Libro encontrado = servicioLibro.obtenerLibro(id);
		
		assertThat(encontrado).isNotNull();
		assertThat(encontrado.getNombre()).isEqualTo("Libro de prueba");
	}
	
	@Test
	public void buscarLibrosPorOrdenAlfabetico() throws ServicioException {
		libroRepository.save(new Libro("A libro", autor, "000000", editorial, 
				"Resumen de la historia", "imagen.png", genero));
		libroRepository.save(new Libro("Z libro", autor, "000001", editorial, 
				"Resumen de la historia", "imagen.png", genero));
		
		List<Libro> libros = servicioLibro.buscarLibrosPorOrdenAlfabetico();
		
		assertThat(libros).isNotEmpty();
		assertThat(libros.get(0).getNombre()).isEqualTo("A libro");
	}
	
	@Test
	public void eliminarLibroTest() throws ServicioException {
		Libro libro = libroRepository.save(new Libro("Libro de prueba", autor, "000000", editorial, 
				"Resumen de la historia", "imagen.png", genero));
		Integer id = libro.getId();
		
		servicioLibro.eliminarLibro(id);
		
		assertThat(autorRepository.findById(id)).isEmpty();
	}
	
	@Test
	public void buscarTodosUltimosLibrosIncorporadosTest() throws ServicioException {
		libroRepository.save(new Libro("Libro primero", autor, "000000", editorial, 
				"Resumen de la historia", "imagen.png", genero));
		libroRepository.save(new Libro("Libro segundo", autor, "000001", editorial, 
				"Resumen de la historia", "imagen.png", genero));
		libroRepository.save(new Libro("Libro último", autor, "000001", editorial, 
				"Resumen de la historia", "imagen.png", genero));
		
		List<Libro> resultados = servicioLibro.buscarTodosUltimosLibrosIncorporados();
		
		assertThat(resultados).isNotNull();
		assertThat(resultados.get(0).getNombre()).isEqualTo("Libro último");
	}
	
	@Test
	public void modificarLibroTest() throws ServicioException {
		Libro inicial = libroRepository.save(new Libro("Libro de prueba", autor, "000000", editorial, 
				"Resumen de la historia", "imagen.png", genero));
		
		inicial.setNombre(" libro modificado ");
		inicial.setPortada("portada.jpg");
		
		Libro modificado = servicioLibro.modificarLibro(inicial);
		
		entityManager.flush();
		entityManager.clear();
		
		assertThat(modificado.getNombre()).isEqualTo("Libro modificado");
		assertThat(modificado.getPortada()).isEqualTo("portada.jpg");
		assertThat(modificado.getId()).isEqualTo(inicial.getId());
	}
}
