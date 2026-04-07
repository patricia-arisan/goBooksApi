package com.atrium.gobooks.dto;

/**
 * DTO que representa la informacion de un autor y el conteo de sus libros asociados
 */
public class AutorDTO {

	/**
	 * Identificador unico del autor
	 */
	private Integer idAutor;

	/**
	 * Nombre del autor
	 */
	private String nombre;

	/**
	 * Numero de libros asociados al autor
	 */
	private Long numeroLibros;
	
	// Constructor por defecto
	public AutorDTO() {
		
	}

	/**
	 * Constructor para crear un autor con su identificador, nombre y numero del conteo de libros
	 * @param idAutor El id del autor
	 * @param nombre El nombre del autor
	 * @param numeroLibros El numero de libros del autor
	 */
	public AutorDTO(Integer idAutor, String nombre, Long numeroLibros) {
		super();
		this.idAutor = idAutor;
		this.nombre = nombre;
		this.numeroLibros = numeroLibros;
	}

	/**
	 * Getters y setters para obtener o establecer el id, nombre y numero de libros del autor
	 */
	public Integer getIdAutor() {
		return idAutor;
	}

	public void setIdAutor(Integer idAutor) {
		this.idAutor = idAutor;
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
	 * Retorna un String con los detalles del autorDTO
	 */
	@Override
	public String toString() {
		return "AutorDTO [idAutor=" + idAutor + ", nombre=" + nombre + ", numeroLibros=" + numeroLibros + "]";
	}
	
}
