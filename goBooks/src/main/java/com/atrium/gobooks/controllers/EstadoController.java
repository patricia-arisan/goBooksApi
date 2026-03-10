package com.atrium.gobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.services.ServicioEstado;

/**
 * Controlador Rest para la gestion de estados.
 * Proporciona endpoint para consulta
 */
@RestController
@RequestMapping("/api/estado")
public class EstadoController {

	@Autowired
	private ServicioEstado servicioEstado;

	/**
	 * Recupera todos los estados de la bbdd
	 * @return una lista de {@link Estado}
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@GetMapping("/listadoEstados")
	public List<Estado> listarEstados() throws ServicioException {
		List<Estado> estados = servicioEstado.listaEstados();
		return estados;
	}

}
