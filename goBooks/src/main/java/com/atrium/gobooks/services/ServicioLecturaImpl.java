package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.dto.LecturaDTO;
import com.atrium.gobooks.entities.Estado;
import com.atrium.gobooks.entities.Lectura;
import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.EstadoRepository;
import com.atrium.gobooks.repositories.LecturaRepository;
import com.atrium.gobooks.repositories.LibroRepository;
import com.atrium.gobooks.repositories.UsuarioRepository;

/**
 * Implementacion de la interfaz {@link ServicioLectura}, y proporciona la
 * logica de negocio para la gestion de lecturas Se comunica con la capa de
 * persistencia mediante {@link LecturaRepository}, ademas de coordinarse con 
 * los repositorios del libro, el usuario y el estado
 */
@Service
public class ServicioLecturaImpl implements ServicioLectura {
	/** 
	 * Instancia del logger para registrar eventos y errores de la clase 
	 */
	Logger log = LoggerFactory.getLogger(ServicioLecturaImpl.class);

	/**
	 * Repositorio para el acceso a datos de {@link Lectura}
	 */
	@Autowired
	LecturaRepository lecturaRepository;

	/**
	 * Repositorio para el acceso a datos de {@link Libro}
	 */
	@Autowired
	LibroRepository libroRepository;

	/**
	 * Repositorio para el acceso a datos de {@link Usuario}
	 */
	@Autowired
	UsuarioRepository usuarioRepository;

	/**
	 * Repositorio para el acceso a datos de {@link Estado}
	 */
	@Autowired
	EstadoRepository estadoRepository;

	/**
	 * Agrega y guarda una nueva lectura de un libro en la bbdd.
	 * Convierte un LecturaDTO en una entidad {@link Lectura} tras validar la existencia del 
	 * usuario, libro y estado proporcionados
	 * @param lecturaDTO La {@link LecturaDTO} a guardar
	 * @return La lectura guardada junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	@Override
	public Lectura grabarLectura(LecturaDTO lecturaDTO) throws ServicioException {
		log.info("[grabarLectura]");
		log.info("lectura: " + lecturaDTO.toString());
		// Comprobacion de la existencia de la lectura para evitar duplicados
		if(this.buscarLecturaUsuario(lecturaDTO.getIdLibro(), lecturaDTO.getIdUsuario()) != null) {
			return null;
		}

		Lectura lectura = new Lectura();
		try {
			// Optional para comprobar si el registro existe antes de almacenar el id del usuario
			Optional<Usuario> usuarioOp = usuarioRepository.findById(lecturaDTO.getIdUsuario());
			// Si el id no esta presente en la bbdd, lanza el error de usuario no encontrado
			if (!usuarioOp.isPresent())
				throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
			// Se almacena el id del usuario si se obtiene true en la busqueda de este
			lectura.setUsuario(usuarioOp.get());

			// Optional para comprobar si el registro existe antes de almacenar el id del libro
			Optional<Libro> libroOp = libroRepository.findById(lecturaDTO.getIdLibro());
			// Si el id no esta presente en la bbdd, lanza el error de libro no encontrado
			if (!libroOp.isPresent())
				throw new ServicioException(CodigoError.LIBRO_NOT_FOUND);
			// Se almacena el id del libro si se obtiene true en la busqueda de este
			lectura.setLibro(libroOp.get());

			// Optional para comprobar si el registro existe antes de almacenar el id del estado
			Optional<Estado> estadoOp = estadoRepository.findById(lecturaDTO.getIdEstado());
			// Si el id no esta presente en la bbdd, lanza el error de estado no encontrado
			if (!estadoOp.isPresent())
				throw new ServicioException(CodigoError.ESTADO_NOT_FOUND);
			// Se almacena el id del estado si se obtiene true en la busqueda de este
			lectura.setEstado(estadoOp.get());
			
			// Se extrae la puntuacion del DTO y se almacena en la Lectura
			lectura.setPuntuacion(lecturaDTO.getPuntuacion());

			// Se registra la lectura
			lecturaRepository.save(lectura);

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return lectura;
	}

	/**
	 * Recupera todas las lecturas del usuario
	 * @param id El id del usuario
	 * @return una lista de {@link Lectura} agregadas por el usuario
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Lectura> buscarLecturasUsuario(Integer id) throws ServicioException {
		log.info("[listaLecturas]");

		List<Lectura> lecturas;

		try {
			lecturas = lecturaRepository.buscarLecturasUsuario(id);

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return lecturas;
	}

	/**
	 * Recupera las lecturas del usuario en funcion del estado en el que se encuentra
	 * @param idUsuario El id del usuario de la lectura
	 * @param idEstado El id del estado de la lectura del usuario
	 * @return una lista de {@link Lectura} por parte del usuario, correspondientes a un
	 * estado concreto
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Lectura> buscarLecturasEstadoUsuario(Integer idUsuario, Integer idEstado) throws ServicioException {
		log.info("[listaLecturasEstado]");

		List<Lectura> lecturas;

		try {
			lecturas = lecturaRepository.buscarLecturasEstadoUsuario(idUsuario, idEstado);
			log.info("lectura: " + lecturas.toString());

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return lecturas;
	}

	/**
	 * Busca la {@link Lectura} de un libro por el usuario y el libro
	 * @param idLibro El id del libro de la lectura
	 * @param idUsuario El id del usuario de la lectura
	 * @return la lectura encontrada y si no se encuentra, null
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public Lectura buscarLecturaUsuario(Integer idLibro, Integer idUsuario) throws ServicioException {
		log.info("[busquedaLecturaUsuario]");

		Libro libro;
		Usuario usuario;
		Lectura lectura;
		try {
			// Optional para comprobar si el registro existe antes de almacenar el id del libro
			Optional<Libro> libroOp = libroRepository.findById(idLibro);
			// Si el id no esta presente en la bbdd, lanza el error de libro no encontrado
			if (!libroOp.isPresent())
				throw new ServicioException(CodigoError.LIBRO_NOT_FOUND);
			// Si lo encuentra, se almacena el idLibro
			libro = libroOp.get();
			// Optional para comprobar si el registro existe antes de almacenar el id del usuario
			Optional<Usuario> usuarioOp = usuarioRepository.findById(idUsuario);
			// Si el id no esta presente en la bbdd, lanza el error de usuario no encontrado
			if (!usuarioOp.isPresent())
				throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
			// Si lo encuentra, se almacena el idUsuario
			usuario = usuarioOp.get();
			
			// Se lanza la busqueda con los dos ids validados
			lectura = lecturaRepository.buscarLecturaUsuario(idLibro, idUsuario);

		} catch (ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return lectura;
	}

	/**
	 * Recupera la puntuacion media de las lecturas de un libro
	 * @param idLibro El id del libro
	 * @return la puntuacion media del libro, que puede tener decimales
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public Float mediaLectura(Integer idLibro) throws ServicioException {
		log.info("[meadiaLecturas]");

		Float mediaLectura = 0F;

		try {

			mediaLectura = lecturaRepository.mediaLectura(idLibro);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return mediaLectura;
	}

	/**
	 * Actualiza la informacion de una lectura que ya existe en la bbdd. Valida la existencia
	 * de la lectura por el id
	 * @param lectura La {@link Lectura} a actualizar
	 * @return La lectura tras ejecutarse la actualizacion
	 * @throws ServicioException Si la lectura no existe o se produce un error al actualizar
	 */
	@Override
	public Lectura modificarLectura(Lectura lectura) throws ServicioException {
		// Optional para comprobar si el registro existe antes de editar
		Optional<Lectura> lecturaOp = lecturaRepository.findById(lectura.getId());
		// Si el id no esta presente en la bbdd lanza el error de lectura no encontrado
		if (!lecturaOp.isPresent())
			throw new ServicioException(CodigoError.LECTURA_NOT_FOUND);

		try {
			// Se guarda en la bbdd la lectura actualizada
			lectura = lecturaRepository.save(lectura);

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return lectura;
	}

	/**
	 * Elimina la lectura del sistema en funcion de su identificador
	 * @param idLectura El identificador de {@link Lectura}
	 * @throws ServicioException Si la lectura no se encuentra
	 */
	@Override
	public void eliminarLectura(Integer idLectura) throws ServicioException {
		log.info("[eliminarLectura]");
		log.debug("[idLectura: " + idLectura + "]");

		try {
			lecturaRepository.deleteById(idLectura);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
	}

}
