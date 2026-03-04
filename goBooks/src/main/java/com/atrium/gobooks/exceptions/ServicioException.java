package com.atrium.gobooks.exceptions;

//Se suprimen los warnings ya que en la aplicacion no se emplea serialVersionUID
@SuppressWarnings("serial")
/**
 * Excepcion personalizada para los servicios de la aplicacion
 * Gestiona errores asociandolos a un codigo especifico
 */
public class ServicioException extends Exception {

	/** Codigo identificador del error */
	final String codigo;

	/*
	 * Constructor que almacena un codigo de error y la excepcion original
	 * @param codigo El identificador del error
	 * @param e Excepcion originaria que causo el fallo
	 */
	public ServicioException(String codigo, Exception e) {
		super(e.getMessage());
		this.codigo = codigo;
	}

	/**
	 * Constructor que acepta un codigo de error
	 * @param codigo El codigo identificador del error
	 */
	public ServicioException(String codigo) {
		this.codigo = codigo;
	}

	/**
	 * Obtiene el codigo de error de la excepcion
	 * @return El codigo de error de la excepcion
	 */
	public String getCodigo() {
		return this.codigo;
	}

}
