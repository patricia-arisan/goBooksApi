package com.atrium.gobooks.exceptions;

/**
 * Codigos de error de la aplicacion
 * Proporciona identificadores para la gestion de excepciones y mensajes de error
 */
public class CodigoError {

	/** Error generico del sistema */
	public static final String ERROR_GENERAL = "00000001";
	
	/** Usuario no encontrado en la bbdd */
	public static final String USUARIO_NOT_FOUND = "00000002";
	
	/** Autor no encontrado en la bbdd */
	public static final String AUTOR_NOT_FOUND = "00000003";
	
	/** Libro no encontrado en la bbdd */
	public static final String LIBRO_NOT_FOUND = "00000004";
	
	/** Estado no encontrado en la bbdd */
	public static final String ESTADO_NOT_FOUND = "00000005";
	
	/** Lectura no encontrada en la bbdd */
	public static final String LECTURA_NOT_FOUND = "00000006";
	
	/** Editorial no encontrada en la bbdd */
	public static final String EDITORIAL_NOT_FOUND = "00000007";
	
	/** Genero no encontrado en la bbdd */
	public static final String GENERO_NOT_FOUND = "00000008";
	
	/** El usuario ha sido encontrado porque ya existe en la bbdd */
	public static final String USUARIO_FOUND = "00000009";
	
	/** El autor ha sido encontrado porque ya existe en la bbdd */
	public static final String AUTOR_FOUND = "00000010";
	
	/** La editorial ha sido encontrada porque ya existe en la bbdd */
	public static final String EDITORIAL_FOUND = "00000011";
	
	/** El genero ha sido encontrado porque ya existe en la bbdd */
	public static final String GENERO_FOUND = "00000012";
	
	/** El libro ha sido encontrado porque ya existe en la bbdd */
	public static final String LIBRO_FOUND = "00000013";
	
	/** El isbn ha sido encontrado porque ya existe en la bbdd */
	public static final String ISBN_FOUND = "00000014";
	
	/** El campoo del autor ha sido enviado vacio */
	public static final String AUTOR_REQUIRED = "00000015";
	
	/** El campoo del editorial ha sido enviado vacio */
	public static final String EDITORIAL_REQUIRED = "00000016";
	
	/** El campoo del genero ha sido enviado vacio */
	public static final String GENERO_REQUIRED = "00000017";
	
	/** El campoo del nombre ha sido enviado vacio */
	public static final String NOMBRE_REQUIRED = "00000018";

}
