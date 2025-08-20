package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.LecturaRepository;
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
	public Libro guardarLibro(Libro libro) throws ServicioException {
		log.info("[grabarLibro]");
		log.info("[libro: "+libro.toString()+"]");
		
		try{
			libro =libroRepository.save(libro);
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
	public void eliminarLibro(Integer idLibro) throws ServicioException {
		// TODO Auto-generated method stub
		
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

}
