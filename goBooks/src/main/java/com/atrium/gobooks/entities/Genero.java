package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Representa la entidad Genero que se mapea en la tabla GENERO de la bbdd
 */
@Entity
@Table(name = "GENERO")
public class Genero {

	/**
	 * Identificador unico del genero, que se autoincrementa en la bbdd
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "GENERO_ID")
	private Integer id;

	@Column(name = "GENERO_NOMBRE")
	private String nombre;

	// Constructor por defecto
	public Genero() {

	}

	/**
	 * Constructor para crear un genero con su nombre
	 * @param nombre El nombre del genero
	 */
	public Genero(String nombre) {
		super();
		this.nombre = nombre;
	}

	public Integer getId() {
		return id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Retorna un string con los detalles del genero
	 */
	@Override
	public String toString() {
		return "Genero [id=" + id + ", nombre=" + nombre + "]";
	}

}
