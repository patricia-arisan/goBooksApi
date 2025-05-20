package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="EDITORIAL")
public class Editorial {
	
	@Id
	@GeneratedValue
	@Column(name="EDITORIAL_ID")
	private Integer id;
	
	@Column(name="EDITORIAL_NOMBRE")
	private String nombre;

	public Editorial() {
		
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

	@Override
	public String toString() {
		return "Editorial [id=" + id + ", nombre=" + nombre + "]";
	}
	
	
}
