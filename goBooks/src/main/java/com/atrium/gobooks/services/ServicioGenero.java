package com.atrium.gobooks.services;

import java.util.List;


import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.exceptions.ServicioException;

public interface ServicioGenero {
	
	Genero guardarGenero(Genero genero) throws ServicioException;
	
	List<Genero> buscarGenerosPorOrdenAlfabetico() throws ServicioException;
	
	Genero obtenerGenero(Integer id) throws ServicioException;
	
	Genero modificarGenero(Genero genero) throws ServicioException;

}
