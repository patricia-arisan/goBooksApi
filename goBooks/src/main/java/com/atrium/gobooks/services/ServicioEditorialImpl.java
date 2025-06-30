package com.atrium.gobooks.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.EditorialRepository;

@Service
public class ServicioEditorialImpl implements ServicioEditorial{
	
	Logger log = LoggerFactory.getLogger(ServicioEditorialImpl.class);
	
	@Autowired
	EditorialRepository editorialRepository;

	@Override
	public Editorial guardarEditorial(Editorial editorial) throws ServicioException {
		log.info("[grabarEditorial]");
		log.info("[editorial: "+editorial.toString()+"]");
		
		try{
			editorial =editorialRepository.save(editorial);
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return editorial;
	}

	@Override
	public List<Editorial> buscarEditorialesPorOrdenAlfabetico() throws ServicioException {
		log.info("[listEditoriales]");
		
		List<Editorial> editoriales;
		
		try {
			editoriales= editorialRepository.buscarEditorialesPorOrdenAlfabetico();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return editoriales;
	}

}
