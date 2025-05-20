package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	@ManyToOne
	@JoinColumn(name="LIBRO_ID")
	private Libro libro;
	@ManyToOne
	@JoinColumn(name="USUARIO_ID")
	private Usuario usuario;
	
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
		return "Estado [id=" + id + ", situacion=" + situacion + ", libro=" + libro + ", usuario=" + usuario + "]";
	}
	
	

}
