package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.dto.EditorialDTO;
import com.atrium.gobooks.entities.Autor;
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
	public Editorial guardarEditorial(Editorial registro) throws ServicioException {
		log.info("[grabarEditorial]");
		log.info("[editorial: "+registro.toString()+"]");
		
		String nombre = registro.getNombre().trim();
		nombre = nombre.substring(0,1).toUpperCase() + nombre.substring(1);
		
		Editorial editorial = new Editorial(nombre);
		
		try{
			Editorial editorialAux = editorialRepository.findByName(editorial.getNombre());
			if(editorialAux!=null) throw new ServicioException(CodigoError.EDITORIAL_FOUND);
			editorial =editorialRepository.save(editorial);
		}catch(ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;	
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
		log.info("[actualizarEditorial]");
		log.info("[editorial: "+editorial.toString()+"]");
		
		Optional<Editorial> editorialOp = editorialRepository.findById(editorial.getId());
		if (!editorialOp.isPresent()) throw new ServicioException(CodigoError.EDITORIAL_NOT_FOUND);
		
		String nombre = editorial.getNombre().trim();
		nombre = nombre.substring(0,1).toUpperCase() + nombre.substring(1);
		editorial.setNombre(nombre);
		
		try {
			Editorial editorialNombre = editorialRepository.findByName(editorial.getNombre());
			if(editorialNombre!=null && editorialNombre.getId()!=editorial.getId()) throw new ServicioException(CodigoError.EDITORIAL_FOUND);
			
			editorial= editorialRepository.save(editorial);
			
		} catch(ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
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
