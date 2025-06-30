package com.atrium.gobooks.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public List<Libro> listaLibros() throws ServicioException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Libro obtenerLibro(Integer idLibro) throws ServicioException {
		// TODO Auto-generated method stub
		return null;
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
	public void eliminarLibro(Integer idLibro) throws ServicioException {
		// TODO Auto-generated method stub
		
	}

}
