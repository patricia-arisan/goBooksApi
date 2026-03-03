package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Representa la entidad Lectura que se mapea en la tabla LECTURA de la bbdd
 */
@Entity
@Table(name="LECTURA")
public class Lectura {
	
	/**
	 * Identificador unico de la lectura, que se autoincrementa en la bbdd
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="LECTURA_ID")
	private Integer id;

	/**
	 * Puntuacion otorgada a la lectura del libro
	 */
	@Column(name = "LECTURA_PUNTUACION")
	private Float puntuacion;
	
	/**
	 * Relacion con el estado en el que se encuentra la lectura del libro
	 */
	@ManyToOne
	@JoinColumn(name = "ESTADO_ID")
	private Estado estado;
	
	/**
	 * Relacion con el libro que esta siendo leido
	 */
	@ManyToOne
	@JoinColumn(name = "LIBRO_ID")
	private Libro libro;
	
	/**
	 * Relacion con el usuario que realiza la lectura
	 */
	@ManyToOne
	@JoinColumn(name = "USUARIO_ID")
	private Usuario usuario;
	
	// Constructor por defecto
	public Lectura() {
		
	}
	
	/**
	 * Getters y setters para obtener o establecer el id de la lectura, la puntuacion,
	 * el estado, el libro y el usuario
	 */
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
	
	/**
	 * Retorna un string con los detalles de la lectura
	 */
	@Override
	public String toString() {
		return "Lectura [id=" + id + ", puntuacion=" + puntuacion + ", estado=" + estado + ", libro=" + libro
				+ ", usuario=" + usuario + "]";
	}	
	
}
