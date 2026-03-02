package com.atrium.gobooks.dto;

public class EditorialDTO {

	private Integer idEditorial;

	private String nombre;

	private Long numeroLibros;

	public EditorialDTO(Integer idEditorial, String nombre, Long numeroLibros) {
		super();
		this.idEditorial = idEditorial;
		this.nombre = nombre;
		this.numeroLibros = numeroLibros;
	}

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

	@Override
	public String toString() {
		return "EditorialDTO [idEditorial=" + idEditorial + ", nombre=" + nombre + ", numeroLibros=" + numeroLibros
				+ "]";
	}

}
