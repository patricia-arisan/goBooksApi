package com.atrium.gobooks.services;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.entities.Rol;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.UsuarioRepository;

/**
 * Implementacion de la interfaz {@link ServicioUsuario}, y proporciona la logica de negocio para 
 * la gestion de usuarios
 * Se comunica con la capa de persistencia mediante {@link UsuarioRepository}
 */
@Service
public class ServicioUsuarioImpl implements ServicioUsuario {
	
	/** 
	 * Instancia del logger para registrar eventos y errores de la clase 
	 */
	Logger log = LoggerFactory.getLogger(ServicioUsuarioImpl.class);

	/**
	 * Repositorio para el acceso a datos de {@link Usuario}
	 */
	@Autowired
	UsuarioRepository usuarioRepository;

	// Cifrado de password
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	/**
	 * Busqueda del {@link Usuario} por el correo que sirve de username
	 * @param username El username del usuario
	 * @return un {@link Optional} del usuario encontrado y si no lo encuentra, devuelve null
	 */
	@Override
	public Optional<Usuario> findByUsername(String username) {
		// Si el repositorio devuelve null, devuelve un optional vacio de forma segura
		return Optional.ofNullable(usuarioRepository.findByUsername(username)); 
	}

	/**
	 * Metodo requerido por la interfaz UserDetailsService para Spring Security para 
	 * cargar datos especificos del usuario.
	 * Convierte a la entidad usuario en un objeto UserDetails para la autenticacion
	 * @param username El username del usuario, que es el correo con el que debe loguearse
	 * @return UserDetails con credenciales y roles
	 * @throws UsernameNotFoundException si no encuentra el usuario en la bbdd
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findByUsername(username);
		// Si viene vacio el usuario, se lanza la excepcion
		if (usuario == null) {
			log.error("UsernameNotFoundException", username);
			throw new UsernameNotFoundException(username);
		}
		// Mapeamos la entidad Usuario para convertirla en el User que emplea Spring Security
		return org.springframework.security.core.userdetails.User.withUsername(usuario.getUsername())
				.password(usuario.getPassword()).authorities(usuario.getRol().getNombre())
				.build();
	}

	/*
	 * Agrega y guarda un nuevo usuario en la bbdd, cifrando su password
	 * @param usuario El nuevo {@link Usuario} a guardar
	 * @return El usuario guardado junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	@Override
	public Usuario registrar(Usuario registro) throws ServicioException {
		log.info("[registrarUsuario]");
		log.debug("[registro_Usuario: " + registro.toString() + "]");

		/**
		 * Comprobacion para evitar campos nulos o invalidos en username y password
		 */
		if (registro.getUsername() == null || registro.getUsername().trim().isEmpty()) {
			log.error(CodigoError.USERNAME_REQUIRED);
			throw new ServicioException(CodigoError.USERNAME_REQUIRED);
		}
		
		String emailRegex ="^[A-Za-z0-9_.-]+@(.+)$";
		if(!registro.getUsername().matches(emailRegex)) {
			throw new ServicioException(CodigoError.USERNAME_INVALID_FORMAT);
		}
		
		if (registro.getPassword() == null || registro.getPassword().trim().isEmpty()) {
			log.error(CodigoError.PASSWORD_REQUIRED);
			throw new ServicioException(CodigoError.PASSWORD_REQUIRED);
		}
		
		String passwordPattern = "^(?=.*[a-zA-Z0-9$@#$!%*?&()+-{|},;.:_^<=>~\"'`/])(?!.*\\s).{6,}$";
		if(!registro.getPassword().matches(passwordPattern)) {
			throw new ServicioException(CodigoError.PASSWORD_INVALID_FORMAT);
		}
		
		String nombre = "";
		if (registro.getNombre() != null) {
			nombre = registro.getNombre().trim();
		} else {
			nombre = "Usuario";
		}
		
		String apellido = "";
		if (registro.getApellido() != null) {
			apellido = registro.getApellido().trim();
		}
		
		Integer rol = 0;
		if (registro.getRol() == null || registro.getRol().getId() == null){
			rol = 2;
		} else {
			rol = registro.getRol().getId();
		}
		Rol rolGuardado = new Rol();
		rolGuardado.setId(rol);
				
		
		// Creacion del usuario sin espacios en el nombre, en el apellido y en la password encriptada
		Usuario usuario = new Usuario(nombre, apellido,
				registro.getUsername().trim(), passwordEncoder.encode(registro.getPassword().trim()),
				registro.getFechaNacimiento(), rolGuardado);

		try {
			// Verificacion de existencia del username del usuario en la bbdd
			Usuario usuarioAux = usuarioRepository.findByUsername(usuario.getUsername());
			// Si se encuentra, se lanza la excepcion de usuario encontrado al ser true
			if (usuarioAux != null)
				throw new ServicioException(CodigoError.USUARIO_FOUND);
			// Guardado del usuario
			registro = usuarioRepository.save(usuario);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return usuario;
	}

	/**
	 * Actualiza la informacion de un usuario que ya existe en la bbdd
	 * @param usuario El {@link Usuario} a actualizar
	 * @return El usuario tras ejecutarse la actualizacion
	 * @throws ServicioException Si el usuario no existe o se produce un error al actualizar
	 */
	@Override
	public Usuario modificar(Usuario usuario) throws ServicioException {
		// Optional para comprobar si el registro existe antes de editar
		Optional<Usuario> usuarioOp = usuarioRepository.findById(usuario.getId());
		// Si el id no esta presente en la bbdd, lanza el error de usuario no encontrado
		if (!usuarioOp.isPresent())
			throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
		
		/**
		 * Comprobacion para evitar campos nulos o invalidos en username y password
		 */
		if (usuario.getUsername() == null || usuario.getUsername().trim().isEmpty()) {
			log.error(CodigoError.USERNAME_REQUIRED);
			throw new ServicioException(CodigoError.USERNAME_REQUIRED);
		}
		
		String emailRegex ="^[A-Za-z0-9_.-]+@(.+)$";
		if(!usuario.getUsername().matches(emailRegex)) {
			throw new ServicioException(CodigoError.USERNAME_INVALID_FORMAT);
		}
		
		String nombre = "";
		if (usuario.getNombre() != null) {
			nombre = usuario.getNombre().trim();
		} else {
			nombre = "Usuario";
		}
		
		String apellido = "";
		if (usuario.getApellido() != null) {
			apellido = usuario.getApellido().trim();
		}
		
		Integer rol = 0;
		if (usuario.getRol() == null || usuario.getRol().getId() == null){
			rol = 2;
		} else {
			rol = usuario.getRol().getId();
		}
		Rol rolGuardado = new Rol();
		rolGuardado.setId(rol);

		try {
			// Verificacion de existencia del username del usuario en la bbdd
			Usuario usuarioAux = usuarioRepository.findByUsername(usuario.getUsername());
			/**
			 * Si se encuentra al usuario por el username en la bbdd, pero es un usuario con un id 
			 * distinto al que se va a actualizar, se lanza el error de usuario encontrado
			 */
			if (usuarioAux != null && usuarioAux.getId() != usuario.getId())
				throw new ServicioException(CodigoError.USUARIO_FOUND);
			
			// Se guarda en la bbdd al usuario actualizado
			usuario = usuarioRepository.save(usuario);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return usuario;

	}

	/**
	 * Recupera un usuario en concreto mediante su identificador
	 * @param idUsuario El identificador del {@link Usuario}
	 * @return El usuario encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@Override
	public Usuario conseguirUsuario(Integer idUsuario) throws ServicioException {
		log.info("[conseguirUsuario]");
		log.debug("[idUsuario: " + idUsuario + "]");

		Usuario usuario;

		try {
			// Optional para comprobar si el registro existe en la bbdd
			Optional<Usuario> usuarioOp = usuarioRepository.findById(idUsuario);
			// Si en id no esta presente en la bbdd lanza el error de usuario no encontrado
			if (!usuarioOp.isPresent())
				throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
			// Si lo encuentra, se almacena el usuario
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

	/**
	 * Elimina al usuario del sistema en funcion de su identificador
	 * @param idUsuario El identificador del {@link Usuario}
	 * @throws ServicioException Si el usuario no se encuentra
	 */
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

	/**
	 * Actualiza la informacion del password de un usuario que ya existe en la bbdd,
	 * aplicando el cifrado de esta
	 * @param password El nuevo password a actualizar del usuario 
	 * @param id El identificador del {@link Usuario}
	 * @return El usuario tras ejecutarse la actualizacion
	 * @throws ServicioException Si el usuario no existe o se produce un error al actualizar
	 */
	@Override
	public Usuario modificarPassword(String password, Integer id) throws ServicioException {
		log.info("[password]");
		log.debug("[password: " + password + "]");
		
		// Optional para comprobar si el registro existe en la bbdd
		Optional<Usuario> usuarioOp = usuarioRepository.findById(id);
		// Si en id no esta presente en la bbdd lanza el error de usuario no encontrado
		if (!usuarioOp.isPresent())
			throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
		// Si lo encuentra, se almacena el usuario
		Usuario usuario = usuarioOp.get();
		
		//Comprobacion para evitar que el password sea nulo o tenga un formato incorrecto
		if (password == null || password.trim().isEmpty()) {
			log.error(CodigoError.PASSWORD_REQUIRED);
			throw new ServicioException(CodigoError.PASSWORD_REQUIRED);
		}
		
		String passwordPattern = "^(?=.*[a-zA-Z0-9$@#$!%*?&()+-{|},;.:_^<=>~\"'`/])(?!.*\\s).{6,}$";
		if(!password.matches(passwordPattern)) {
			throw new ServicioException(CodigoError.PASSWORD_INVALID_FORMAT);
		}
		
		try {
			// Se almacena el nuevo password encriptado en el usuario
			usuario.setPassword(passwordEncoder.encode(password));
			// Se guarda el usuario con la nueva password encriptada
			usuario = usuarioRepository.save(usuario);

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return usuario;
	}

}
