package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.LibroRepository;

@Service
public class ServicioLibroImpl implements ServicioLibro{
	
	Logger log = LoggerFactory.getLogger(ServicioLibroImpl.class);
	
	@Autowired
	LibroRepository libroRepository;
	
	

	@Override
	public List<Libro> buscarLibrosPorOrdenAlfabetico() throws ServicioException {
		log.info("[listLibros]");
		
		List<Libro> libros;
		
		try {
			libros= libroRepository.buscarLibrosPorOrdenAlfabetico();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libros;
	}

	@Override
	public Libro obtenerLibro(Integer idLibro) throws ServicioException {
		log.info("[conseguirLibro]");
		log.debug("[idLibro: "+idLibro+"]");
		
		Libro libro;
		
		try {
			Optional<Libro> libroOp= libroRepository.findById(idLibro);
			if(!libroOp.isPresent()) throw new ServicioException(CodigoError.LIBRO_NOT_FOUND);
			libro= libroOp.get();
		}catch(ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libro;

	}

	@Override
	public Libro guardarLibro(Libro registro) throws ServicioException {
		log.info("[grabarLibro]");
		log.info("[libro: "+registro.toString()+"]");
		
		String titulo = registro.getNombre().trim();
		titulo = titulo.substring(0,1).toUpperCase() + titulo.substring(1);
		
		String isbn = "";
		if(registro.getIsbn()!=null) {
			isbn = registro.getIsbn().trim();
		}
		
		String sinopsis = "";
		if(registro.getSinopsis()!=null) {
			sinopsis = registro.getSinopsis().trim();
		}
		
		Libro libro = new Libro(titulo,registro.getAutor(),isbn,
				registro.getEditorial(),sinopsis,registro.getPortada().trim(),
				registro.getGenero());
		
		try{
			Libro libroNombre = libroRepository.findByName(libro.getNombre());
			if(libroNombre!=null) throw new ServicioException(CodigoError.LIBRO_FOUND);
			if(registro.getIsbn()!=null && !registro.getIsbn().isEmpty()) {
				Libro libroIsbn = libroRepository.findByIsbn(libro.getIsbn());
				if(libroIsbn!=null) throw new ServicioException(CodigoError.ISBN_FOUND);
			}
			
			registro =libroRepository.save(libro);
		}catch(ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libro;
	}
	
	@Override
	public List<Libro> buscarLibrosPorGeneroId(Integer id) throws ServicioException {
		
		log.info("[listLibrosGenero]");
		
		List<Libro> libros;
		
		try {
			libros= libroRepository.buscarLibrosPorGeneroId(id);
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libros;

	}
	
	@Override
	public List<Libro> buscarLibrosPorAutorId(Integer id) throws ServicioException {
		
		log.info("[listLibrosAutor]");
		
		List<Libro> libros;
		
		try {
			libros= libroRepository.buscarLibrosPorAutorId(id);
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libros;

	}
	
	@Override
	public List<Libro> buscarLibrosPorEditorialId(Integer id) throws ServicioException {
		
		log.info("[listLibrosEditorial]");
		
		List<Libro> libros;
		
		try {
			libros= libroRepository.buscarLibrosPorEditorialId(id);
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libros;

	}
	
	@Override
	public void eliminarLibro(Integer idLibro) throws ServicioException {
		log.info("[eliminarLibro]");
		log.debug("[idLibro: " + idLibro + "]");

		try {
			libroRepository.deleteById(idLibro);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		
		
	}

	@Override
	public List<Libro> buscarUltimosLibrosIncorporados() throws ServicioException {
		log.info("[listUltimosLibros]");
		
		List<Libro> libros;
		
		try {
			libros= libroRepository.buscarUltimosLibrosIncorporados();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libros;
	}
	
	@Override
	public List<Libro> buscarTodosUltimosLibrosIncorporados() throws ServicioException {
		log.info("[listTodosUltimosLibros]");
		
		List<Libro> libros;
		
		try {
			libros= libroRepository.buscarTodosUltimosLibrosIncorporados();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libros;
	}

	
	////////////
	@Override
	public List<Libro> listaLibrosMayorPuntuacion() throws ServicioException {
		log.info("[listPuntuacionLibros]");
List<Libro> libros;
		
		try {
			libros= libroRepository.listaLibrosMayorPuntuacion();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libros;
	}
	
	@Override
	public List<Libro> librosMayorPuntuacion() throws ServicioException {
		log.info("[puntuacionLibros]");
		List<Libro> libros;
		
		try {
			libros= libroRepository.librosMayorPuntuacion();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libros;
	}
	
	@Override
	public List<Libro> busquedaLibros(String clave) throws ServicioException{
		log.info("[resultadoLibros]");
		List<Libro> libros;
		
		try {
			libros=libroRepository.buscarLibro(clave);
		}catch(Exception e){
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libros;
	}
	
	@Override
	public Libro modificarLibro(Libro libro) throws ServicioException {
		log.info("[actualizarLibro]");
		log.info("[libro: "+libro.toString()+"]");
		
		Optional<Libro> libroOp = libroRepository.findById(libro.getId());
		if (!libroOp.isPresent()) throw new ServicioException(CodigoError.LIBRO_NOT_FOUND);
		
		String titulo = libro.getNombre().trim();
		titulo = titulo.substring(0,1).toUpperCase() + titulo.substring(1);
		libro.setNombre(titulo);
		
		String isbn = "";
		if(libro.getIsbn()!=null) {
			isbn = libro.getIsbn().trim();
			libro.setIsbn(isbn);
		}
		
		String sinopsis = "";
		if(libro.getSinopsis()!=null) {
			sinopsis = libro.getSinopsis().trim();
			libro.setSinopsis(sinopsis);
		}
		
		try {
			Libro libroNombre = libroRepository.findByName(libro.getNombre());
			if(libroNombre!=null && libroNombre.getId()!=libro.getId()) throw new ServicioException(CodigoError.LIBRO_FOUND);
			if(libro.getIsbn()!=null && !libro.getIsbn().isEmpty()) {
				Libro libroIsbn = libroRepository.findByIsbn(libro.getIsbn());
				if(libroIsbn!=null) throw new ServicioException(CodigoError.ISBN_FOUND);
			}
			libro= libroRepository.save(libro);
			
		}catch(ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return libro;
	}	
	
	
}
