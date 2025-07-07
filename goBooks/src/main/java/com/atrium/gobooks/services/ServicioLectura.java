package com.atrium.gobooks.services;

import com.atrium.gobooks.dto.LecturaDTO;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.exceptions.ServicioException;

public interface ServicioLectura {
	
	Lectura grabarLectura(LecturaDTO lecturaDTO) throws ServicioException;

}
