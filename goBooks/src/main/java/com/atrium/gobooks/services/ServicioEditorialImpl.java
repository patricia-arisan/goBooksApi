package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.dto.EditorialDTO;
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
	
	@Override
	public Editorial modificarEditorial(Editorial editorial) throws ServicioException {
		Optional<Editorial> editorialOp = editorialRepository.findById(editorial.getId());
		if (!editorialOp.isPresent()) throw new ServicioException(CodigoError.EDITORIAL_NOT_FOUND);
		
		try {
			editorial= editorialRepository.save(editorial);
			
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return editorial;
	}

	@Override
	public Editorial obtenerEditorial(Integer id) throws ServicioException {
		log.info("[conseguirEditorial]");
		log.debug("[idEditorial: "+id+"]");
		
		Editorial editorial;
		
		try {
			Optional<Editorial> editorialOp= editorialRepository.findById(id);
			if(!editorialOp.isPresent()) throw new ServicioException(CodigoError.EDITORIAL_NOT_FOUND);
			editorial= editorialOp.get();
		}catch(ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return editorial;
	}
	
	@Override
	public List<EditorialDTO> numeroLibrosEditorial() throws ServicioException {
		log.info("[listConteoLibrosDTO]");
		List<EditorialDTO> editoriales;
		
		try {
			editoriales= editorialRepository.numeroLibrosEditorial();
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return editoriales;
	}

	@Override
	public void eliminarEditorial(Integer id) throws ServicioException {
		log.info("[eliminarEditorial]");
		log.debug("[idEditorial: " + id + "]");

		try {
			editorialRepository.deleteById(id);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		
		
	}

}
