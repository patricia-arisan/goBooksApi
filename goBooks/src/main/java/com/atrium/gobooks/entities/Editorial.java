package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Representa la entidad Editorial que se mapea en la tabla EDITORIAL de la bbdd
 */
@Entity
@Table(name = "EDITORIAL")
public class Editorial {
	
	/**
	 * Identificador unico de la editorial, que se autoincrementa en la bbdd
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "EDITORIAL_ID")
	private Integer id;

	@Column(name = "EDITORIAL_NOMBRE")
	private String nombre;

	// Constructor por defecto
	public Editorial() {

	}

	/**
	 * Constructor para crear una editorial con su nombre
	 * @param nombre El nombre de la editorial
	 */
	public Editorial(String nombre) {
		super();
		this.nombre = nombre;
	}

	/**
	 * Getters y setters para obtener o establecer el id y el nombre de la editorial
	 */
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
	 * Retorna un String con los detalles de la editorial
	 */
	@Override
	public String toString() {
		return "Editorial [id=" + id + ", nombre=" + nombre + "]";
	}

}
