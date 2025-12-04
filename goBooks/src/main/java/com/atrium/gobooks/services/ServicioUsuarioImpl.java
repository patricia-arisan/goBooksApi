package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.UsuarioRepository;

@Service
public class ServicioUsuarioImpl implements ServicioUsuario{

	Logger log = LoggerFactory.getLogger(ServicioUsuarioImpl.class);

	
	@Autowired
	UsuarioRepository usuarioRepository;

	@Autowired
	ServicioUsuario usuarioServicio;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public List<Usuario> listarUsuarios() throws ServicioException {
		log.info("[listarUsuarios]");
		List<Usuario> usuarios;
		try {
			usuarios = usuarioRepository.findAll();
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return usuarios;
	}

//	@Override

	public Optional<Usuario> findByUsername(String username) {
        return Optional.ofNullable(usuarioRepository.findByUsername(username)); //findbyusername?
    }

	//SE ESTA USANDO EL DEL OPTIONAL
	// validacion de registro. Encontrar usuario registrado por su email
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Usuario usuario = usuarioRepository.findByUsername(username);
		// si el campo esta vacio
		if (usuario == null) {
			// throw new UsernameNotFoundException("Usuario o password inválidos");
			throw new UsernameNotFoundException(username);

		}

//		UserDetails user = User.withUsername(usuario.getEmail()).password(usuario.getPassword()).authorities("USER")
//				.build();
//		return user;
		return org.springframework.security.core.userdetails.User
                .withUsername(usuario.getUsername())
                .password(usuario.getPassword())
                .authorities(usuario.getRol().getNombre())
                //.authorities("USER") ///
                .build();
	}

	@Override
	public Usuario registrar(Usuario registro) throws ServicioException {
		log.info("[registrarUsuario]");
		log.debug("[registro_Usuario: " + registro.toString() + "]");
		
		
		Usuario usuario = new Usuario(registro.getNombre().trim(), registro.getApellido().trim(), 
				registro.getUsername(), passwordEncoder.encode(registro.getPassword().trim()),
				registro.getFechaNacimiento(),registro.getRol());
		
		try {
			Usuario usuarioAux;
			usuarioAux = usuarioRepository.findByUsername(usuario.getUsername());
			if(usuarioAux!=null) throw new ServicioException(CodigoError.USUARIO_FOUND);
			registro = usuarioRepository.save(usuario);
		}catch(ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		
		return usuario;
	}

	
	
	@Override 
	public Usuario modificar(Usuario usuario) throws ServicioException{
		
		Optional<Usuario> usuarioOp = usuarioRepository.findById(usuario.getId());
		if (!usuarioOp.isPresent()) throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
		
		try {
			Usuario usuarioAux;
			usuarioAux = usuarioRepository.findByUsername(usuario.getUsername());
			if(usuarioAux!=null) throw new ServicioException(CodigoError.USUARIO_FOUND);
			usuario= usuarioRepository.save(usuario);
		}catch(ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
			
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return usuario;
		
	}
	

	
	@Override
	public Usuario conseguirUsuario(Integer idUsuario) throws ServicioException {
		log.info("[conseguirUsuario]");
		log.debug("[idUsuario: " + idUsuario + "]");

		Usuario usuario;

		try {
			Optional<Usuario> usuarioOp = usuarioRepository.findById(idUsuario);
			if (!usuarioOp.isPresent())
				throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
			usuario = usuarioOp.get();
		} catch (ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return usuario;

	
	}

	@Override
	public void eliminarUsuario(Integer idUsuario) throws ServicioException {
		log.info("[eliminarUsuario]");
		log.debug("[idUsuario: " + idUsuario + "]");

		try {
			usuarioRepository.deleteById(idUsuario);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}

	}

	@Override
	public Usuario modificarPassword(String password, Integer id) throws ServicioException {
		log.info("[password]");
		log.debug("[password: " + password + "]");
		Optional<Usuario> usuarioOp = usuarioRepository.findById(id);
		if (!usuarioOp.isPresent()) throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
		Usuario usuario = usuarioOp.get();
		try {
			usuario.setPassword(passwordEncoder.encode(password));
			usuario= usuarioRepository.save(usuario);
			
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return usuario;
	}

	
}
