package com.atrium.gobooks.dto;

/**
 * DTO que representa el password actualizado de un usuario
 */
public class PasswordDTO {

	private String password;
	
	// Constructor por defecto
	public PasswordDTO() {
		
	}

	/**
	 * Constructor para almacenar la password en un objeto
	 * @param password
	 */
	public PasswordDTO(String password) {
		super();
		this.password = password;
	}

	/**
	 * Getters y setters para obtener o establecer el nuevo password del usuario
	 */
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Retorna un String con los detalles del passwordDTO
	 */
	@Override
	public String toString() {
		return "PasswordDTO [password=" + password + "]";
	}

}
