package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.dto.EditorialDTO;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.exceptions.ServicioException;

public interface ServicioEditorial {
	
	Editorial guardarEditorial(Editorial editorial) throws ServicioException;
	
	List<Editorial> buscarEditorialesPorOrdenAlfabetico() throws ServicioException;
	
	Editorial modificarEditorial(Editorial editorial) throws ServicioException;
	
	Editorial obtenerEditorial(Integer id) throws ServicioException;
	
	List<EditorialDTO> numeroLibrosEditorial() throws ServicioException;
	
	void eliminarEditorial(Integer id) throws ServicioException;

}
