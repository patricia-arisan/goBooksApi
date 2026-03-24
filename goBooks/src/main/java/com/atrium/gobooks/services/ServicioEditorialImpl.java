package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.dto.EditorialDTO;
import com.atrium.gobooks.entities.Editorial;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.EditorialRepository;

/**
 * Implementacion de la interfaz {@link ServicioEditorial}, y proporciona la logica de negocio para 
 * la gestion de editoriales
 * Se comunica con la capa de persistencia mediante {@link EditorialRepositoryTest}
 */
@Service
public class ServicioEditorialImpl implements ServicioEditorial {

	/** 
	 * Instancia del logger para registrar eventos y errores de la clase 
	 */
	Logger log = LoggerFactory.getLogger(ServicioEditorialImpl.class);

	/**
	 * Repositorio para el acceso a datos de {@link Editorial}
	 */
	@Autowired
	EditorialRepository editorialRepository;

	/**
	 * Agrega y guarda una nueva editorial en la bbdd.
	 * Transforma a mayuscula la inicial del nombre de la editorial y verifica 
	 * que no exista previamente.
	 * @param editorial La {@link Editorial} a guardar
	 * @return La editorial guardada junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	@Override
	public Editorial guardarEditorial(Editorial registro) throws ServicioException {
		log.info("[grabarEditorial]");
		log.info("[editorial: " + registro.toString() + "]");

		/**
		 *  Formateado del texto. Primero quita los posibles espacios de delante y de detras, 
		 *  y despues transforma a mayuscula la inicial del nombre 
		 */
		String nombre = registro.getNombre().trim();
		nombre = nombre.substring(0, 1).toUpperCase() + nombre.substring(1);

		Editorial editorial = new Editorial(nombre);

		try {
			// Verificacion de existencia del nombre de la editorial en la bbdd
			Editorial editorialAux = editorialRepository.findByName(editorial.getNombre());
			// Si se encuentra, se lanza la excepcion de editorial encontrada al ser true
			if (editorialAux != null)
				throw new ServicioException(CodigoError.EDITORIAL_FOUND);
			// Si no se ha encontrado en el paso anterior, se continua con el registro de la editorial
			editorial = editorialRepository.save(editorial);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return editorial;
	}

	/**
	 * Recupera todas las editoriales de la bbdd ordenadas por nombre de la A a la Z
	 * @return una lista de {@link Editorial} ordenadas de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Editorial> buscarEditorialesPorOrdenAlfabetico() throws ServicioException {
		log.info("[listEditoriales]");

		List<Editorial> editoriales;

		try {
			editoriales = editorialRepository.buscarEditorialesPorOrdenAlfabetico();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return editoriales;
	}

	/**
	 * Actualiza la informacion de una editorial que ya existe en la bbdd. Valida la existencia
	 * de la editorial por el id y previene la duplicidad de nombres con otros registros
	 * @param editorial La {@link Editorial} a actualizar
	 * @return La editorial tras ejecutarse la actualizacion
	 * @throws ServicioException Si la editorial no existe o se produce un error al actualizar
	 */
	@Override
	public Editorial modificarEditorial(Editorial editorial) throws ServicioException {
		log.info("[actualizarEditorial]");
		log.info("[editorial: " + editorial.toString() + "]");

		// Optional para comprobar si el registro existe antes de editar
		Optional<Editorial> editorialOp = editorialRepository.findById(editorial.getId());
		// Si el id no esta presente en la bbdd lanza el error de editorial no encontrada
		if (!editorialOp.isPresent())
			throw new ServicioException(CodigoError.EDITORIAL_NOT_FOUND);

		/**
		 *  Formateado del texto. Primero quita los posibles espacios de delante y de detras, 
		 *  y despues transforma a mayuscula la inicial del nombre 
		 */
		String nombre = editorial.getNombre().trim();
		nombre = nombre.substring(0, 1).toUpperCase() + nombre.substring(1);
		// Se almacena el nuevo nombre
		editorial.setNombre(nombre);

		try {
			// Verificacion de existencia del nombre de la editorial en la bbdd
			Editorial editorialNombre = editorialRepository.findByName(editorial.getNombre());
			/**
			 * Si se encuentra la editorial por el nombre en la bbdd, pero es una editorial con 
			 * un id distinto a la que se va a actualizar, se lanza el error de editorial encontrada
			 */
			if (editorialNombre != null && editorialNombre.getId() != editorial.getId())
				throw new ServicioException(CodigoError.EDITORIAL_FOUND);
			// Se guarda en la bbdd la editorial actualizada
			editorial = editorialRepository.save(editorial);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return editorial;
	}

	/**
	 * Recupera una editorial en concreto mediante su identificador
	 * @param id El identificador de la {@link Editorial}
	 * @return La editorial encontrada
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@Override
	public Editorial obtenerEditorial(Integer id) throws ServicioException {
		log.info("[conseguirEditorial]");
		log.debug("[idEditorial: " + id + "]");

		Editorial editorial;

		try {
			// Optional para comprobar si el registro existe en la bbdd
			Optional<Editorial> editorialOp = editorialRepository.findById(id);
			// Si el id no esta presente en la bbdd lanza el error de editorial no encontrada
			if (!editorialOp.isPresent())
				throw new ServicioException(CodigoError.EDITORIAL_NOT_FOUND);
			// Si lo encuentra, se almacena la editorial
			editorial = editorialOp.get();
		} catch (ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return editorial;
	}

	/**
	 * Recupera todas las editoriales de la bbdd ordenadas por nombre de la A a la Z,
	 * con el conteo de sus libros asociados
	 * @return una lista de {@link EditorialDTO} ordenadas de forma alfabetica y con su numero de libros
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<EditorialDTO> numeroLibrosEditorial() throws ServicioException {
		log.info("[listConteoLibrosDTO]");
		List<EditorialDTO> editoriales;

		try {
			editoriales = editorialRepository.numeroLibrosEditorial();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return editoriales;
	}

	/**
	 * Elimina la editorial del sistema en funcion de su identificador
	 * @param id El identificador de la {@link Editorial}
	 * @throws ServicioException Si la editorial no se encuentra o se encuentra vinculada a un libro
	 */
	@Override
	public void eliminarEditorial(Integer id) throws ServicioException {
		log.info("[eliminarEditorial]");
		log.debug("[idEditorial: " + id + "]");

		try {
			editorialRepository.deleteById(id);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}

	}

}
