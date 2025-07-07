package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="ESTADO")
public class Estado {
	
	@Id
	@GeneratedValue
	@Column(name="ESTADO_ID")
	private Integer id;
	
	@Column(name="SITUACION")
	private String situacion;
	
	
	public Estado() {
				
	}

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

	@Override
	public String toString() {
		return "Estado [id=" + id + ", situacion=" + situacion + "]";
	}

	
	

}
