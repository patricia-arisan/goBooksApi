package com.atrium.gobooks.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public Genero guardarGenero(Genero genero) throws ServicioException {
		log.info("[grabarGenero]");
		log.info("[genero: "+genero.toString()+"]");
		
		try{
			genero =generoRepository.save(genero);
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
	


}
