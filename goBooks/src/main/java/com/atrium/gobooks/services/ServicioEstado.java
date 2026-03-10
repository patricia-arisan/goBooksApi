package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.exceptions.ServicioException;

/**
 * Interfaz que define los servicios de gestion de los estados
 * Permite operaciones CRUD y consultas especificas
 */
public interface ServicioEstado {

	/**
	 * Recupera todos los estados de la bbdd 
	 * @return una lista de {@link Estado}
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	List<Estado> listaEstados() throws ServicioException;
}
