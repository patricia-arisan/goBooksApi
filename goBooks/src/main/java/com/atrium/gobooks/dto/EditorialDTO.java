package com.atrium.gobooks.dto;

/**
 * DTO que representa la informacion de una editorial y el conteo de sus libros asociados
 */
public class EditorialDTO {

	/**
	 * Identificador unico de la editorial
	 */
	private Integer idEditorial;

	/**
	 * Nombre de la editorial
	 */
	private String nombre;

	/**
	 * Numero de libros pertenecientes a la editorial
	 */
	private Long numeroLibros;

	/**
	 * Constructor para crear una editorial con su identificador, nombre y numero del conteo de libros
	 * @param idEditorial El id de la editorial
	 * @param nombre El nombre de la editorial
	 * @param numeroLibros El numero de libros de la editorial
	 */
	public EditorialDTO(Integer idEditorial, String nombre, Long numeroLibros) {
		super();
		this.idEditorial = idEditorial;
		this.nombre = nombre;
		this.numeroLibros = numeroLibros;
	}

	/**
	 * Getters y setters para obtener o establecer el id, nombre y numero de libros de la editorial
	 */
	public Integer getIdEditorial() {
		return idEditorial;
	}

	public void setIdEditorial(Integer idEditorial) {
		this.idEditorial = idEditorial;
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
	 * Retorna un String con los detalles de la editorialDTO
	 */
	@Override
	public String toString() {
		return "EditorialDTO [idEditorial=" + idEditorial + ", nombre=" + nombre + ", numeroLibros=" + numeroLibros
				+ "]";
	}

}
