package com.atrium.gobooks.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.EstadoRepository;

@Service
public class ServicioEstadoImpl implements ServicioEstado{
	
	Logger log = LoggerFactory.getLogger(ServicioEstadoImpl.class);
	
	@Autowired
	EstadoRepository estadoRepository;

	@Override
	public List<Estado> listaEstados() throws ServicioException {
		log.info("[listEstados]");
		
		List<Estado> estados;
		
		try {
			estados= estadoRepository.findAll();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return estados;
	}

}
