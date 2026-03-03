package com.atrium.gobooks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atrium.gobooks.entities.Usuario;

/**
 * Repositorio que gestiona la persitencia de datos del Usuario
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

	/**
	 * Busqueda del usuario por el correo que sirve de username
	 * @param username El username del usuario
	 * @return el usuario encontrado y si no lo encuentra, devuelve null
	 */
	public Usuario findByUsername(String username);

}
