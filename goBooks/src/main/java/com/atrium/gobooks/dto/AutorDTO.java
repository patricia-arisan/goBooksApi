package com.atrium.gobooks.dto;

public class AutorDTO {

	private Integer idAutor;

	private String nombre;

	private Long numeroLibros;

	public AutorDTO(Integer idAutor, String nombre, Long numeroLibros) {
		super();
		this.idAutor = idAutor;
		this.nombre = nombre;
		this.numeroLibros = numeroLibros;
	}

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

	@Override
	public String toString() {
		return "AutorDTO [idAutor=" + idAutor + ", nombre=" + nombre + ", numeroLibros=" + numeroLibros + "]";
	}
	
}
