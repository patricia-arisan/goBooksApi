package com.atrium.gobooks.exceptions;

/**
 * Clase para devolver un error estandarizado, el cual contiene un codigo y un mensaje de error
 */
public class ErrorResponse {
	
	/** Identificador del error */
	private String codigo;
	
	/** Detalles del error */
	private String mensaje;

	/**
	 * Constructor almacena un codigo y un mensaje de error
	 * @param codigo El codigo identificador del error
	 * @param mensaje El mensaje explicativo
	 */
	public ErrorResponse(String codigo, String mensaje) {
		super();
		this.codigo = codigo;
		this.mensaje = mensaje;
	}

	/**
	 * Getters y setters para obtener o establecer el codigo y el mensaje del error
	 */
	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

}
