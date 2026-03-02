package com.atrium.gobooks.dto;

public class LecturaDTO {

	private Integer idLectura;

	private Integer idLibro;

	private Integer idUsuario;

	private Integer idEstado;

	private Float puntuacion;

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

	@Override
	public String toString() {
		return "LecturaDTO [idLectura=" + idLectura + ", idLibro=" + idLibro + ", idUsuario=" + idUsuario
				+ ", idEstado=" + idEstado + ", puntuacion=" + puntuacion + "]";
	}
	
}
