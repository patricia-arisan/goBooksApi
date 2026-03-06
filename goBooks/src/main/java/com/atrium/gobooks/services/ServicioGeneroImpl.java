package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.dto.GeneroDTO;
import com.atrium.gobooks.entities.Genero;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.GeneroRepository;

/**
 * Implementacion de la interfaz {@link ServicioGenero}, y proporciona la logica
 * de negocio para la gestion de generos Se comunica con la capa de persistencia
 * mediante {@link GeneroRepository}
 */
@Service
public class ServicioGeneroImpl implements ServicioGenero {

	/**
	 * Instancia del logger para registrar eventos y errores de la clase
	 */
	Logger log = LoggerFactory.getLogger(ServicioGeneroImpl.class);

	/**
	 * Repositorio para el acceso a datos de {@link Genero}
	 */
	@Autowired
	GeneroRepository generoRepository;

	/**
	 * Agrega y guarda un nuevo genero en la bbdd. 
	 * Transforma a mayuscula la inicial del nombre del genero y verifica que no exista previamente	 * 
	 * @param genero El {@link Genero} a guardar
	 * @return El genero guardado junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	@Override
	public Genero guardarGenero(Genero registro) throws ServicioException {
		log.info("[grabarGenero]");
		log.info("[genero: " + registro.toString() + "]");
		/**
		 * Formateado del texto. Primero quita los posibles espacios de delante y de
		 * detras, y despues transforma a mayuscula la inicial del nombre
		 */
		String nombre = registro.getNombre().trim();
		nombre = nombre.substring(0, 1).toUpperCase() + nombre.substring(1);

		Genero genero = new Genero(nombre);

		try {
			// Verificacion de existencia del nombre del genero en la bbdd
			Genero generoAux = generoRepository.findByName(genero.getNombre());
			// Si se encuentra, se lanza la excepcion de genero encontrado al ser true
			if (generoAux != null)
				throw new ServicioException(CodigoError.GENERO_FOUND);
			// Si no se ha encontrado en el paso anterior, se continua con el registro del genero
			genero = generoRepository.save(genero);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return genero;
	}

	/**
	 * Recupera todos los generos de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Genero} ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Genero> buscarGenerosPorOrdenAlfabetico() throws ServicioException {
		log.info("[listGeneros]");

		List<Genero> generos;

		try {
			generos = generoRepository.buscarGenerosPorOrdenAlfabetico();
			
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return generos;
	}

	/**
	 * Actualiza la informacion de un genero que ya existe en la bbdd. Valida la existencia
	 * del genero por el id y previene la duplicidad de nombres con otros registros
	 * @param genero El {@link Genero} a actualizar
	 * @return El genero tras ejecutarse la actualizacion
	 * @throws ServicioException Si el genero no existe o se produce un error al actualizar
	 */
	@Override
	public Genero modificarGenero(Genero genero) throws ServicioException {
		log.info("[actualizarGenero]");
		log.info("[genero: " + genero.toString() + "]");

		// Optional para comprobar si el registro existe antes de editar
		Optional<Genero> generoOp = generoRepository.findById(genero.getId());
		// Si el id no esta presente en la bbdd lanza el error de genero no encontrado
		if (!generoOp.isPresent())
			throw new ServicioException(CodigoError.GENERO_NOT_FOUND);

		/**
		 *  Formateado del texto. Primero quita los posibles espacios de delante y de detras, 
		 *  y despues transforma a mayuscula la inicial del nombre 
		 */
		String nombre = genero.getNombre().trim();
		nombre = nombre.substring(0, 1).toUpperCase() + nombre.substring(1);
		// Se almacena el nuevo nombre
		genero.setNombre(nombre);

		try {
			// Verificacion de existencia del nombre del genero en la bbdd
			Genero generoNombre = generoRepository.findByName(genero.getNombre());
			/**
			 * Si se encuentra el genero por el nombre en la bbdd, pero es un genero con un id 
			 * distinto al que se va a actualizar, se lanza el error de genero encontrado
			 */
			if (generoNombre != null && generoNombre.getId() != genero.getId())
				throw new ServicioException(CodigoError.GENERO_FOUND);
			// Se guarda en la bbdd el genero actualizado
			genero = generoRepository.save(genero);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return genero;
	}

	/**
	 * Recupera un genero en concreto mediante su identificador
	 * @param id El identificador del {@link Genero}
	 * @return El genero encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@Override
	public Genero obtenerGenero(Integer id) throws ServicioException {
		log.info("[conseguirGenero]");
		log.debug("[idGenero: " + id + "]");

		Genero genero;

		try {
			// Optional para comprobar si el registro existe en la bbdd
			Optional<Genero> generoOp = generoRepository.findById(id);
			// Si el id no esta presente en la bbdd lanza el error de genero no encontrado
			if (!generoOp.isPresent())
				throw new ServicioException(CodigoError.GENERO_NOT_FOUND);
			// Si lo encuentra, se almacena el genero
			genero = generoOp.get();
		} catch (ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return genero;
	}

	/**
	 * Recupera todos los generos de la bbdd ordenados por nombre de la A a la Z,
	 * con el conteo de sus libros asociados
	 * @return una lista de {@link GeneroDTO} ordenados de forma alfabetica y con su numero de libros
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<GeneroDTO> numeroLibrosGenero() throws ServicioException {
		log.info("[listConteoLibrosDTO]");
		List<GeneroDTO> generos;

		try {
			generos = generoRepository.numeroLibrosGenero();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return generos;
	}

	/**
	 * Elimina al genero del sistema en funcion de su identificador
	 * @param id El identificador del {@link Genero}
	 * @throws ServicioException Si el genero no se encuentra o se encuentra vinculado a un libro
	 */
	@Override
	public void eliminarGenero(Integer id) throws ServicioException {
		log.info("[eliminarGenero]");
		log.debug("[idGenero: " + id + "]");

		try {
			generoRepository.deleteById(id);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
	}

}
