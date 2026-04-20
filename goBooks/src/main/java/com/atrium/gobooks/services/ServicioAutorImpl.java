package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.dto.AutorDTO;
import com.atrium.gobooks.entities.Autor;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.AutorRepository;

/**
 * Implementacion de la interfaz {@link ServicioAutor}, y proporciona la logica de negocio para 
 * la gestion de autores
 * Se comunica con la capa de persistencia mediante {@link AutorRepository}
 */
@Service
public class ServicioAutorImpl implements ServicioAutor {
	
	/** 
	 * Instancia del logger para registrar eventos y errores de la clase 
	 */
	Logger log = LoggerFactory.getLogger(ServicioAutorImpl.class);

	/**
	 * Repositorio para el acceso a datos de {@link Autor}
	 */
	@Autowired
	AutorRepository autorRepository;

	/**
	 * Guarda el registro del nuevo autor en la bbdd.
	 * Transforma a mayuscula la inicial del nombre del autor y verifica que no exista previamente
	 * @param registro El objeto {@link Autor} a guardar
	 * @return El autor guardado junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	@Override
	public Autor guardarAutor(Autor registro) throws ServicioException {
		log.info("[grabarAutor]");
		log.info("[autor: " + registro.toString() + "]");		
		
		/**
		 * Comprobacion de que no venga nulo el nombre del autor
		 */
		if (registro.getNombre() == null || registro.getNombre().trim().isEmpty()) {
			log.error(CodigoError.NOMBRE_REQUIRED);
			throw new ServicioException(CodigoError.NOMBRE_REQUIRED);
		} 
		
		/**
		 *  Formateado del texto. Primero quita los posibles espacios de delante y de detras, 
		 *  y despues transforma a mayuscula la inicial del nombre 
		 */
		String nombre = registro.getNombre().trim();
		nombre = nombre.substring(0, 1).toUpperCase() + nombre.substring(1);

		Autor autor = new Autor(nombre);

		try {
			// Verificacion de existencia del nombre del autor en la bbdd
			Autor autorAux = autorRepository.findByName(autor.getNombre());
			// Si se encuentra, se lanza la excepcion de autor encontrado al ser true
			if (autorAux != null)
				throw new ServicioException(CodigoError.AUTOR_FOUND);
			// Si no se ha encontrado en el paso anterior, se continua con el registro del autor
			autor = autorRepository.save(autor);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return autor;
	}

	/**
	 * Recupera todos los autores de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Autor} ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Autor> buscarAutoresPorOrdenAlfabetico() throws ServicioException {
		log.info("[listaAutores]");

		List<Autor> autores;

		try {
			autores = autorRepository.buscarAutoresPorOrdenAlfabetico();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return autores;
	}

	/**
	 * Actualiza la informacion de un autor que ya existe en la bbdd. Valida la existencia
	 * del autor por el id y previene la duplicidad de nombres con otros registros
	 * @param autor El {@link Autor} a actualizar
	 * @return El autor tras ejecutarse la actualizacion
	 * @throws ServicioException Si el autor no existe o se produce un error al actualizar
	 */
	@Override
	public Autor modificarAutor(Autor autor) throws ServicioException {
		log.info("[actualizarAutor]");
		log.info("[autor: " + autor.toString() + "]");

		// Optional para comprobar si el registro existe antes de editar
		Optional<Autor> autorOp = autorRepository.findById(autor.getId());
		// Si el id no esta presente en la bbdd, lanza el error de autor no encontrado
		if (!autorOp.isPresent())
			throw new ServicioException(CodigoError.AUTOR_NOT_FOUND);

		/**
		 * Comprobacion de que no venga nulo el nombre del autor
		 */
		if (autor.getNombre() == null || autor.getNombre().trim().isEmpty()) {
			log.error(CodigoError.NOMBRE_REQUIRED);
			throw new ServicioException(CodigoError.NOMBRE_REQUIRED);
		}
		
		/**
		 *  Formateado del texto. Primero quita los posibles espacios de delante y de detras, 
		 *  y despues transforma a mayuscula la inicial del nombre 
		 */
		String nombre = autor.getNombre().trim();
		nombre = nombre.substring(0, 1).toUpperCase() + nombre.substring(1);
		// Se almacena el nuevo nombre
		autor.setNombre(nombre);

		try {
			// Verificacion de existencia del nombre del autor en la bbdd
			Autor autorNombre = autorRepository.findByName(autor.getNombre());
			/**
			 * Si se encuentra el autor por el nombre en la bbdd, pero es un autor con un id 
			 * distinto al que se va a actualizar, se lanza el error de autor encontrado
			 */
			if (autorNombre != null && autorNombre.getId() != autor.getId())
				throw new ServicioException(CodigoError.AUTOR_FOUND);
			// Se guarda en la bbdd el autor actualizado
			autor = autorRepository.save(autor);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return autor;
	}

	/**
	 * Recupera un autor en concreto mediante su identificador
	 * @param id El identificador del {@link Autor}
	 * @return El autor encontrado 
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@Override
	public Autor obtenerAutor(Integer id) throws ServicioException {
		log.info("[conseguirAutor]");
		log.debug("[idAutor: " + id + "]");

		Autor autor;

		try {
			// Optional para comprobar si el registro existe en la bbdd
			Optional<Autor> autorOp = autorRepository.findById(id);
			// Si en id no esta presente en la bbdd lanza el error de autor no encontrado
			if (!autorOp.isPresent())
				throw new ServicioException(CodigoError.AUTOR_NOT_FOUND);
			// Si lo encuentra, se almacena el autor
			autor = autorOp.get();
		} catch (ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return autor;
	}

	/**
	 * Recupera todos los autores de la bbdd ordenados por nombre de la A a la Z con el conteo 
	 * de sus libros asociados
	 * @return una lista de {@link AutorDTO} ordenados de forma alfabetica y con su numero de libros
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<AutorDTO> numeroLibrosAutor() throws ServicioException {
		log.info("[listaConteoLibrosDTO]");
		
		List<AutorDTO> autores;

		try {
			autores = autorRepository.numeroLibrosAutor();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return autores;
	}

	/**
	 * Elimina al autor del sistema en funcion de su identificador
	 * @param id El identificador del {@link Autor}
	 * @throws ServicioException Si el autor no se encuentra o se encuentra vinculado a un libro
	 */
	@Override
	public void eliminarAutor(Integer id) throws ServicioException {
		log.info("[eliminarAutor]");
		log.debug("[idAutor: " + id + "]");

		try {
			autorRepository.deleteById(id);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
	}

}
