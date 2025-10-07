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
import com.atrium.gobooks.repositories.AutorRepository;

@Service
public class ServicioAutorImpl implements ServicioAutor{

	Logger log = LoggerFactory.getLogger(ServicioAutorImpl.class);
	
	@Autowired
	AutorRepository autorRepository;
	
	@Override
	public Autor guardarAutor(Autor autor) throws ServicioException {
		log.info("[grabarAutor]");
		log.info("[autor: "+autor.toString()+"]");
		
		try{
			autor =autorRepository.save(autor);
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return autor;
	}

	@Override
	public List<Autor> buscarAutoresPorOrdenAlfabetico() throws ServicioException {
		log.info("[listAutores]");
		
		List<Autor> autores;
		
		try {
			autores= autorRepository.buscarAutoresPorOrdenAlfabetico();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return autores;

	}
	
	@Override
	public Autor modificarAutor(Autor autor) throws ServicioException {
		Optional<Autor> autorOp = autorRepository.findById(autor.getId());
		if (!autorOp.isPresent()) throw new ServicioException(CodigoError.AUTOR_NOT_FOUND);
		
		try {
			autor= autorRepository.save(autor);
			
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return autor;
	}

	@Override
	public Autor obtenerAutor(Integer id) throws ServicioException {
		log.info("[conseguirAutor]");
		log.debug("[idAutor: "+id+"]");
		
		Autor autor;
		
		try {
			Optional<Autor> autorOp= autorRepository.findById(id);
			if(!autorOp.isPresent()) throw new ServicioException(CodigoError.AUTOR_NOT_FOUND);
			autor= autorOp.get();
		}catch(ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return autor;
	}

}
