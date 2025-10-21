package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.exceptions.ServicioException;

public interface ServicioAutor {
	
	Autor guardarAutor(Autor autor) throws ServicioException;
	
	Autor obtenerAutor(Integer id) throws ServicioException;
	
	List<Autor> buscarAutoresPorOrdenAlfabetico() throws ServicioException;
	
	Autor modificarAutor(Autor autor) throws ServicioException;
	
	List<AutorDTO> numeroLibrosAutor() throws ServicioException; 
	
	void eliminarAutor(Integer id) throws ServicioException;
}
