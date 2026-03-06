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

/**
 * Implementacion de la interfaz {@link ServicioEstado}, y proporciona la logica de negocio para 
 * la gestion de estados
 * Se comunica con la capa de persistencia mediante {@link EstadoRepository}
 */
@Service
public class ServicioEstadoImpl implements ServicioEstado{
	
	/** 
	 * Instancia del logger para registrar eventos y errores de la clase 
	 */
	Logger log = LoggerFactory.getLogger(ServicioEstadoImpl.class);
	
	/**
	 * Repositorio para el acceso a datos de {@link Estado}
	 */
	@Autowired
	EstadoRepository estadoRepository;

	/**
	 * Recupera todos los estado de la bbdd 
	 * @return una lista de {@link Estado}
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
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
