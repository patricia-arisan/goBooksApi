package com.atrium.gobooks.dto;

/**
 * DTO que representa la informacion de un genero y el conteo de sus libros asociados
 */
public class GeneroDTO {

	/**
	 * Identificador unico del genero
	 */
	private Integer idGenero;
	/**
	 * Nombre del genero
	 */
	private String nombre;

	/**
	 * Numero de libros asociados al genero
	 */
	private Long numeroLibros;

	/**
	 * Constructor para crear un genero con su identificador, nombre y numero del conteo de libros
	 * @param idGenero El id del genero
	 * @param nombre El nombre del genero
	 * @param numeroLibros El numero de libros que pertenecen al genero
	 */
	public GeneroDTO(Integer idGenero, String nombre, Long numeroLibros) {
		super();
		this.idGenero = idGenero;
		this.nombre = nombre;
		this.numeroLibros = numeroLibros;
	}

	/**
	 * Getters y setters para obtener o establecer el id, nombre y numero de libros del genero
	 */
	public Integer getIdGenero() {
		return idGenero;
	}

	public void setIdGenero(Integer idGenero) {
		this.idGenero = idGenero;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Long getNumeroLibros() {
		return numeroLibros;
	}

	public void setNumeroLibros(Long numeroLibros) {
		this.numeroLibros = numeroLibros;
	}

	/**
	 * Retorna un String con los detalles del generoDTO
	 */
	@Override
	public String toString() {
		return "GeneroDTO [idGenero=" + idGenero + ", nombre=" + nombre + ", numeroLibros=" + numeroLibros + "]";
	}

}
