package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Representa la entidad Rol que se mapea en la tabla ROL de la bbdd
 */
@Entity
@Table(name = "ROL")
public class Rol {

	/**
	 * Identificador unico del Rol, que se autoincrementa en la bbdd
	 */
	@Id
	@GeneratedValue
	@Column(name = "ROL_ID")
	private Integer id;

	@Column(name = "ROL_NOMBRE")
	private String nombre;

	// Constructor por defecto
	public Rol() {

	}

	/**
	 * Getters y setters para obtener o establecer el id y el nombre del rol
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
	 * Retorna un String con los detalles del rol
	 */
	@Override
	public String toString() {
		return "Rol [id=" + id + ", nombre=" + nombre + "]";
	}

}
