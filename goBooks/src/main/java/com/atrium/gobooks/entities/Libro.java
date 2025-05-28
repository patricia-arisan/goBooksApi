package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;

@Entity
@Table(name="LIBRO")
//@NamedQuery(name ="Libro.findAll",query = "SELECT l FROM Libro l")
public class Libro {
	
	@Id
	@GeneratedValue
	@Column(name="ID")
	private Integer id;
	
	@Column(name="LIBRO_NOMBRE")
	private String nombre;
	
	@ManyToOne
	@JoinColumn(name="AUTOR_ID")
	private Autor autor;
	
	@Column(name = "LIBRO_ISBN")
	private String isbn;
	
	@ManyToOne
	@JoinColumn(name="EDITORIAL_ID")
	private Editorial editorial;
	
	@Column(name = "LIBRO_SINOPSIS")
	private String sinopsis;
	
	@Column(name = "LIBRO_PORTADA")
	private String portada;
	
	@ManyToOne   //@ManyToMany
	@JoinColumn(name = "GENERO_ID")
	private Genero genero;
	
	
	
	public Libro() {
				
	}


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


	public Autor getAutor() {
		return autor;
	}


	public void setAutor(Autor autor) {
		this.autor = autor;
	}


	public String getIsbn() {
		return isbn;
	}


	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}


	public Editorial getEditorial() {
		return editorial;
	}


	public void setEditorial(Editorial editorial) {
		this.editorial = editorial;
	}


	public String getSinopsis() {
		return sinopsis;
	}


	public void setSinopsis(String sinopsis) {
		this.sinopsis = sinopsis;
	}


	public String getPortada() {
		return portada;
	}


	public void setPortada(String portada) {
		this.portada = portada;
	}


	public Genero getGenero() {
		return genero;
	}


	public void setGenero(Genero genero) {
		this.genero = genero;
	}


	
	@Override
	public String toString() {
		return "Libro [id=" + id + ", nombre=" + nombre + ", autor=" + autor + ", isbn=" + isbn + ", editorial="
				+ editorial + ", sinopsis=" + sinopsis + ", portada=" + portada + ", genero=" + genero + "]";
	}
	
	
	
	

}
