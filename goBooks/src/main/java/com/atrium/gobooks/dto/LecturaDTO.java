package com.atrium.gobooks.dto;

/**
 * DTO que representa la informacion de una lectura
 * Transporta datos entre capas de la aplicacion
 */
public class LecturaDTO {

	/**
	 * Identificador unico de la lectura
	 */
	private Integer idLectura;

	/**
	 * Identificador del libro asociado
	 */
	private Integer idLibro;

	/**
	 * Identificador del usuario que agrega la lectura
	 */
	private Integer idUsuario;

	/**
	 * Identificador del estado con el que se marca la lectura
	 */
	private Integer idEstado;

	/**
	 * Puntuacion que se puede otorgar al libro con estado de Leido
	 */
	private Float puntuacion;

	/**
	 * Getters y setters para obtener o establecer el id de la lectura, los ids del usuario, el libro
	 * y el estado de la lectura, y la puntuacion de la lectura
	 */
	public Integer getIdLectura() {
		return idLectura;
	}

	public void setIdLectura(Integer idLectura) {
		this.idLectura = idLectura;
	}

	public Integer getIdLibro() {
		return idLibro;
	}

	public void setIdLibro(Integer idLibro) {
		this.idLibro = idLibro;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Integer getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Integer idEstado) {
		this.idEstado = idEstado;
	}

	public Float getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(Float puntuacion) {
		this.puntuacion = puntuacion;
	}

	/**
	 * Retorna un String con los detalles de la lecturaDTO
	 */
	@Override
	public String toString() {
		return "LecturaDTO [idLectura=" + idLectura + ", idLibro=" + idLibro + ", idUsuario=" + idUsuario
				+ ", idEstado=" + idEstado + ", puntuacion=" + puntuacion + "]";
	}
	
}
