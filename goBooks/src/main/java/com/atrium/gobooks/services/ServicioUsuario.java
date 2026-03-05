package com.atrium.gobooks.services;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.ServicioException;

/**
 * Interfaz que define los servicios de gestion del usuario
 * Permite operaciones CRUD y consultas especificas
 * Extiende de {@link UserDetailsService} para poder cargar datos especificos del usuario y 
 * poder trabajar con Spring Security
 */
public interface ServicioUsuario extends UserDetailsService{
	
	/**
	 * Agrega y guarda un nuevo usuario en la bbdd
	 * @param usuario El {@link Usuario} a guardar
	 * @return El usuario guardado junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	public Usuario registrar(Usuario usuario)throws ServicioException;
	
	/**
	 * Actualiza la informacion de un usuario que ya existe en la bbdd
	 * @param usuario El {@link Usuario} a actualizar
	 * @return El usuario tras ejecutarse la actualizacion
	 * @throws ServicioException Si el usuario no existe o se produce un error al actualizar
	 */
	public Usuario modificar(Usuario usuario) throws ServicioException;
	
	/**
	 * Actualiza la informacion del password de un usuario que ya existe en la bbdd
	 * @param password El nuevo password a actualizar del usuario 
	 * @param id El identificador del {@link Usuario}
	 * @return El usuario tras ejecutarse la actualizacion
	 * @throws ServicioException Si el usuario no existe o se produce un error al actualizar
	 */
	public Usuario modificarPassword(String password,Integer id) throws ServicioException;
	
	/**
	 * Recupera un usuario en concreto mediante su identificador
	 * @param idUsuario El identificador del {@link Usuario}
	 * @return El usuario encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	Usuario conseguirUsuario(Integer idUsuario) throws ServicioException;
	
	/**
	 * Elimina al usuario del sistema en funcion de su identificador
	 * @param idUsuario El identificador del {@link Usuario}
	 * @throws ServicioException Si el usuario no se encuentra
	 */
	void eliminarUsuario(Integer idUsuario) throws ServicioException;

	/**
	 * Busqueda del {@link Usuario} por el correo que sirve de username
	 * @param username El username del usuario
	 * @return un {@link Optional} del usuario encontrado y si no lo encuentra, devuelve null
	 */
	public Optional<Usuario> findByUsername(String username);

}
