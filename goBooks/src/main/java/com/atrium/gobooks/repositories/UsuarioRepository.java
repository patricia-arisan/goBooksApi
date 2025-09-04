package com.atrium.gobooks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atrium.gobooks.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
	
	//public Usuario findByEmail(String username);
	
	public Usuario findByUsername(String username); 
	
//	public Usuario findUsuario(Integer id);
	
}
