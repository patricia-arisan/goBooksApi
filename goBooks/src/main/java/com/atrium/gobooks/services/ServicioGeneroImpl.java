package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.dto.GeneroDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.GeneroRepository;

@Service
public class ServicioGeneroImpl implements ServicioGenero{
	
	Logger log = LoggerFactory.getLogger(ServicioGeneroImpl.class);
	
	@Autowired
	GeneroRepository generoRepository;

	@Override
	public Genero guardarGenero(Genero registro) throws ServicioException {
		log.info("[grabarGenero]");
		log.info("[genero: "+registro.toString()+"]");
		
		String nombre = registro.getNombre().trim();
		nombre = nombre.substring(0,1).toUpperCase() + nombre.substring(1);
		
		Genero genero = new Genero(nombre);
		
		try{
			Genero generoAux = generoRepository.findByName(genero.getNombre());
			if(generoAux!=null) throw new ServicioException(CodigoError.GENERO_FOUND);
			genero =generoRepository.save(genero);
		}catch(ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return genero;
	}

	@Override
	public List<Genero> buscarGenerosPorOrdenAlfabetico() throws ServicioException {
		log.info("[listGeneros]");
		
		List<Genero> generos;
		
		try {
			generos= generoRepository.buscarGenerosPorOrdenAlfabetico();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return generos;
	}
	
	@Override
	public Genero modificarGenero(Genero genero) throws ServicioException {
		log.info("[actualizarGenero]");
		log.info("[genero: "+genero.toString()+"]");
		
		Optional<Genero> generoOp = generoRepository.findById(genero.getId());
		if (!generoOp.isPresent()) throw new ServicioException(CodigoError.GENERO_NOT_FOUND);
		
		String nombre = genero.getNombre().trim();
		nombre = nombre.substring(0,1).toUpperCase() + nombre.substring(1);
		genero.setNombre(nombre);
		
		try {
			Genero generoNombre = generoRepository.findByName(genero.getNombre());
			if(generoNombre!=null && generoNombre.getId()!=genero.getId()) throw new ServicioException(CodigoError.GENERO_FOUND);
			
			
			genero= generoRepository.save(genero);
			
		} catch(ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return genero;
	}

	@Override
	public Genero obtenerGenero(Integer id) throws ServicioException {
		log.info("[conseguirGenero]");
		log.debug("[idGenero: "+id+"]");
		
		Genero genero;
		
		try {
			Optional<Genero> generoOp= generoRepository.findById(id);
			if(!generoOp.isPresent()) throw new ServicioException(CodigoError.GENERO_NOT_FOUND);
			genero= generoOp.get();
		}catch(ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return genero;
	}
	
	@Override
	public List<GeneroDTO> numeroLibrosGenero() throws ServicioException {
		log.info("[listConteoLibrosDTO]");
		List<GeneroDTO> generos;
		
		try {
			generos= generoRepository.numeroLibrosGenero();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return generos;
	}
	
	@Override
	public void eliminarGenero(Integer id) throws ServicioException {
		log.info("[eliminarGenero]");
		log.debug("[idGenero: " + id + "]");

		try {
			generoRepository.deleteById(id);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		
		
	}

}
