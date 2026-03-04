package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Representa la entidad Autor que se mapea en la tabla AUTOR de la bbdd
 */
@Entity
@Table(name = "AUTOR")
public class Autor {
	
	/**
	 * Identificador unico del autor, que se autoincrementa en la bbdd
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AUTOR_ID")
	private Integer id;

	@Column(name = "AUTOR_NOMBRE")
	private String nombre;

	// Constructor por defecto
	public Autor() {

	}

	/**
	 * Constructor para crear un autor con su nombre
	 * @param nombre El nombre del autor
	 */
	public Autor(String nombre) {
		super();
		this.nombre = nombre;
	}

	/**
	 * Getters y setters para obtener o establecer el id y el nombre del autor
	 */
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Retorna un String con los detalles del autor
	 */
	@Override
	public String toString() {
		return "Autor [id=" + id + ", nombre=" + nombre + "]";
	}

}
