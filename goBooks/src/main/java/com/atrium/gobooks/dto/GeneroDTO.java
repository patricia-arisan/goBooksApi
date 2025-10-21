package com.atrium.gobooks.dto;

public class GeneroDTO {
	
	private Integer idGenero;

	private String nombre;

	private Long numeroLibros;

	public GeneroDTO(Integer idGenero, String nombre, Long numeroLibros) {
		super();
		this.idGenero = idGenero;
		this.nombre = nombre;
		this.numeroLibros = numeroLibros;
	}

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

	@Override
	public String toString() {
		return "GeneroDTO [idGenero=" + idGenero + ", nombre=" + nombre + ", numeroLibros=" + numeroLibros + "]";
	}
	
	

}
