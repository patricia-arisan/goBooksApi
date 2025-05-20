package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class Lectura {

	@Column(name = "LECTURA_PUNTUACION")
	private Float puntuacion;
	
	@ManyToOne
	@JoinColumn(name = "ESTADO_ID")
	private Estado estado;
	
	@ManyToOne
	@JoinColumn(name = "LIBRO_ID")
	private Libro libro;
	
	@ManyToOne
	@JoinColumn(name = "USUARIO_ID")
	private Usuario usuario;
}
