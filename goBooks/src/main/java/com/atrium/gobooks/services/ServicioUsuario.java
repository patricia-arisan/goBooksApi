package com.atrium.gobooks.services;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.ServicioException;

public interface ServicioUsuario extends UserDetailsService{
	
	public Usuario registrar(Usuario usuario)throws ServicioException;;
	
	public List<Usuario> listarUsuarios() throws ServicioException;
	
	Usuario conseguirUsuario(Integer idUsuario) throws ServicioException;
	void eliminarUsuario(Integer idUsuario) throws ServicioException;

	public Usuario findByUserName(String username);

}
