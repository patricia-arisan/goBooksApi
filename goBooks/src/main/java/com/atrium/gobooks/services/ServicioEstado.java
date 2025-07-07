package com.atrium.gobooks.services;

import java.util.List;

import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.exceptions.ServicioException;

public interface ServicioEstado {

	List<Estado> listaEstados() throws ServicioException;
}
