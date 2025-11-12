package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="GENERO")
public class Genero {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="GENERO_ID")
	private Integer id;
	
	@Column(name="GENERO_NOMBRE")
	private String nombre;
	

	public Genero() {
		
	}
	
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


	@Override
	public String toString() {
		return "Genero [id=" + id + ", nombre=" + nombre + "]";
	}
	
	
}
