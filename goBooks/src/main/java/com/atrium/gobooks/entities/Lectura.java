package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="LECTURA")
public class Lectura {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="LECTURA_ID")
	private Integer id;

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
	
	
	public Lectura() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Float getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(Float puntuacion) {
		this.puntuacion = puntuacion;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public Libro getLibro() {
		return libro;
	}

	public void setLibro(Libro libro) {
		this.libro = libro;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	@Override
	public String toString() {
		return "Lectura [id=" + id + ", puntuacion=" + puntuacion + ", estado=" + estado + ", libro=" + libro
				+ ", usuario=" + usuario + "]";
	}
	
	
}
