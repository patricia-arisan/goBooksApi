package com.atrium.gobooks.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Representa la entidad Libro que se mapea en la tabla LIBRO de la bbdd
 */
@Entity
@Table(name = "LIBRO")
public class Libro {

	/**
	 * Identificador unico del libro, que se autoincrementa en la bbdd
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LIBRO_ID")
	private Integer id;

	@Column(name = "LIBRO_NOMBRE")
	private String nombre;

	/**
	 * Relacion con el autor que ha escrito el libro
	 */
	@ManyToOne
	@JoinColumn(name = "AUTOR_ID")
	private Autor autor;

	@Column(name = "LIBRO_ISBN")
	private String isbn;

	/**
	 * Relacion con la editorial propietaria del libro
	 */
	@ManyToOne
	@JoinColumn(name = "EDITORIAL_ID")
	private Editorial editorial;

	@Column(name = "LIBRO_SINOPSIS")
	private String sinopsis;

	@Column(name = "LIBRO_PORTADA")
	private String portada;

	/**
	 * Relacion con el genero con el que se categoriza al libro
	 */
	@ManyToOne 
	@JoinColumn(name = "GENERO_ID")
	private Genero genero;

	// Constructor por defecto
	public Libro() {

	}

		/**
	 * Constructor para crear un libro con su nombre, autor, isbn, editorial, sinopsis, portada 
	 * y genero
	 * @param nombre El nombre del libro
	 * @param autor El autor del libro
	 * @param isbn El isbn del libro
	 * @param editorial La editorial del libro
	 * @param sinopsis La sinopsis del libro
	 * @param portada La portada del libro
	 * @param genero El genero del libro
	 */
	public Libro(String nombre, Autor autor, String isbn, Editorial editorial, String sinopsis, String portada,
			Genero genero) {
		super();
		this.nombre = nombre;
		this.autor = autor;
		this.isbn = isbn;
		this.editorial = editorial;
		this.sinopsis = sinopsis;
		this.portada = portada;
		this.genero = genero;
	}

	/**
	 * Getters y setters para obtener o establecer el id, nombre, autor, isbn, editorial, sinopsis,
	 * portada y genero del libro
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

	/**
	 * Retorna un string con los detalles del libro
	 */
	@Override
	public String toString() {
		return "Libro [id=" + id + ", nombre=" + nombre + ", autor=" + autor + ", isbn=" + isbn + ", editorial="
				+ editorial + ", sinopsis=" + sinopsis + ", portada=" + portada + ", genero=" + genero + "]";
	}

}
