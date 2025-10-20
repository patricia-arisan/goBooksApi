package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.dto.LecturaDTO;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.exceptions.ServicioException;

public interface ServicioLectura {
	
	Lectura grabarLectura(LecturaDTO lecturaDTO) throws ServicioException;
	
	Lectura modificarLectura(Lectura lectura) throws ServicioException;
	
	void eliminarLectura(Integer idLectura) throws ServicioException;
	
	List <Lectura> buscarLecturasUsuario(Integer id) throws ServicioException;
	
	List <Lectura> buscarLecturasEstadoUsuario(Integer idUsuario, Integer idEstado) throws ServicioException;
	
	Lectura buscarLecturaUsuario(Integer idLibro, Integer idUsuario) throws ServicioException;
	
	Float mediaLectura(Integer idLibro) throws ServicioException; 
}
