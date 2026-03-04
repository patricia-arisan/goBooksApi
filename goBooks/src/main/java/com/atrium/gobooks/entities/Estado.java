package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Representa la entidad Estado que se mapea en la tabla ESTADO de la bbdd
 */
@Entity
@Table(name = "ESTADO")
public class Estado {

	/**
	 * Identificador unico del estado, que se autoincrementa en la bbdd
	 */
	@Id
	@GeneratedValue
	@Column(name = "ESTADO_ID")
	private Integer id;

	@Column(name = "SITUACION")
	private String situacion;

	// Constructor por defecto
	public Estado() {

	}

	/**
	 * Getters y setters para obtener o establecer el id y el nombre del estado
	 */
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSituacion() {
		return situacion;
	}

	public void setSituacion(String situacion) {
		this.situacion = situacion;
	}

	/**
	 * Retorna un String con los detalles del estado
	 */
	@Override
	public String toString() {
		return "Estado [id=" + id + ", situacion=" + situacion + "]";
	}

}
