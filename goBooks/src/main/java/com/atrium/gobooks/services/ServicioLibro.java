package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.ServicioException;

public interface ServicioLibro {
	
	List<Libro> buscarLibrosPorOrdenAlfabetico() throws ServicioException;

	Libro obtenerLibro(Integer idLibro) throws ServicioException;

	Libro guardarLibro(Libro libro) throws ServicioException;

	void eliminarLibro(Integer idLibro) throws ServicioException;

}
