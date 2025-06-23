package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.ServicioException;

public interface ServicioUsuario extends UserDetailsService{
	
	public Usuario registrar(Usuario usuario)throws ServicioException;
	
	public Usuario modificar(Usuario usuario) throws ServicioException;
	
	public List<Usuario> listarUsuarios() throws ServicioException;
	
	Usuario conseguirUsuario(Integer idUsuario) throws ServicioException;
	void eliminarUsuario(Integer idUsuario) throws ServicioException;

	public Optional<Usuario> findByUsername(String username);

}
