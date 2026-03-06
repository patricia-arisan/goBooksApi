package com.atrium.gobooks.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atrium.gobooks.entities.Libro;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.LibroRepository;

/**
 * Implementacion de la interfaz {@link ServicioLibro}, y proporciona la logica
 * de negocio para la gestion de libros 
 * Se comunica con la capa de persistencia mediante {@link LibroRepository}
 */
@Service
public class ServicioLibroImpl implements ServicioLibro {

	/**
	 * Instancia del logger para registrar eventos y errores de la clase
	 */
	Logger log = LoggerFactory.getLogger(ServicioLibroImpl.class);

	/**
	 * Repositorio para el acceso a datos de {@link Libro}
	 */
	@Autowired
	LibroRepository libroRepository;

	/**
	 * Recupera todos los libros de la bbdd ordenados por nombre de la A a la Z
	 * @return una lista de {@link Libro} ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Libro> buscarLibrosPorOrdenAlfabetico() throws ServicioException {
		log.info("[listLibros]");

		List<Libro> libros;

		try {
			libros = libroRepository.buscarLibrosPorOrdenAlfabetico();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libros;
	}

	/**
	 * Recupera un libro en concreto mediante su identificador
	 * @param idLibro El identificador del {@link Libro}
	 * @return El libro encontrado
	 * @throws ServicioException Si se produce un error en la consulta o no se encuentra
	 */
	@Override
	public Libro obtenerLibro(Integer idLibro) throws ServicioException {
		log.info("[conseguirLibro]");
		log.debug("[idLibro: " + idLibro + "]");

		Libro libro;

		try {
			// Optional para comprobar si el registro existe en la bbdd
			Optional<Libro> libroOp = libroRepository.findById(idLibro);
			// Si el id no esta presente en la bbdd lanza el error de libro no encontrado
			if (!libroOp.isPresent())
				throw new ServicioException(CodigoError.LIBRO_NOT_FOUND);
			// Si lo encuentra, se almacena el libro
			libro = libroOp.get();
		} catch (ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libro;

	}

	/**
	 * Guarda el registro del nuevo libro en la bbdd.
	 * Transforma a mayuscula la inicial del nombre del libro y verifica que no exista previamente
	 * @param libro El {@link Libro} a guardar
	 * @return El libro guardado junto a su identificador unico proporcionado por la bbdd
	 * @throws ServicioException Si ocurre algun problema durante el proceso
	 */
	@Override
	public Libro guardarLibro(Libro registro) throws ServicioException {
		log.info("[grabarLibro]");
		log.info("[libro: " + registro.toString() + "]");

		/**
		 *  Formateado del texto. Primero quita los posibles espacios de delante y de detras, 
		 *  y despues transforma a mayuscula la inicial del nombre 
		 */
		String titulo = registro.getNombre().trim();
		titulo = titulo.substring(0, 1).toUpperCase() + titulo.substring(1);

		/**
		 *  Formateado del texto. Primero comprueba si el isbn no va vacio, y luego
		 *  quita los posibles espacios de delante y de detras
		 */
		String isbn = "";
		if (registro.getIsbn() != null) {
			isbn = registro.getIsbn().trim();
		}

		/**
		 *  Formateado del texto. Primero comprueba si la sinopsis no va vacia, y luego
		 *  quita los posibles espacios de delante y de detras
		 */
		String sinopsis = "";
		if (registro.getSinopsis() != null) {
			sinopsis = registro.getSinopsis().trim();
		}

		// Creacion del libro con los campos formateados y los que no necesitaban tratamiento
		Libro libro = new Libro(titulo, registro.getAutor(), isbn, registro.getEditorial(), sinopsis,
				registro.getPortada().trim(), registro.getGenero());

		try {
			// Verificacion de existencia del nombre del libro en la bbdd
			Libro libroNombre = libroRepository.findByName(libro.getNombre());
			// Si se encuentra, se lanza la excepcion de libro encontrado al ser true
			if (libroNombre != null)
				throw new ServicioException(CodigoError.LIBRO_FOUND);
			// Comprobaciones si el isbn no esta vacio y nulo
			if (registro.getIsbn() != null && !registro.getIsbn().isEmpty()) {
				// Verificacion de existencia del isbn del libro en la bbdd
				Libro libroIsbn = libroRepository.findByIsbn(libro.getIsbn());
				// Si se encuentra, se lanza la excepcion de isbn encontrado al ser true
				if (libroIsbn != null)
					throw new ServicioException(CodigoError.ISBN_FOUND);
			}
			// Si no se han encontrado en el paso anterior, se continua con el registro del libro
			registro = libroRepository.save(libro);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libro;
	}

	/**
	 * Recupera los libros pertenecientes a un mismo genero, ordenados por nombre de la A a la Z
	 * @param id El id del genero
	 * @return una lista de {@link Libro} del mismo genero ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Libro> buscarLibrosPorGeneroId(Integer id) throws ServicioException {
		log.info("[listLibrosGenero]");

		List<Libro> libros;

		try {
			libros = libroRepository.buscarLibrosPorGeneroId(id);

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libros;
	}

	/**
	 * Recupera los libros pertenecientes a un mismo autor, ordenados por nombre de la A a la Z
	 * @param id El id del autor
	 * @return una lista de {@link Libro} con el mismo autor ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Libro> buscarLibrosPorAutorId(Integer id) throws ServicioException {
		log.info("[listLibrosAutor]");

		List<Libro> libros;

		try {
			libros = libroRepository.buscarLibrosPorAutorId(id);

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libros;
	}

	/**
	 * Recupera los libros pertenecientes a una editorial, ordenados por nombre de la A a la Z
	 * @param id El id de la editorial
	 * @return una lista de {@link Libro} de la misma editorial ordenados de forma alfabetica
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Libro> buscarLibrosPorEditorialId(Integer id) throws ServicioException {
		log.info("[listLibrosEditorial]");

		List<Libro> libros;

		try {
			libros = libroRepository.buscarLibrosPorEditorialId(id);

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libros;
	}

	/*
	 * Elimina al libro del sistema en funcion de su identificador
	 * @param idLibro El identificador del {@link Libro}
	 * @throws ServicioException Si el libro no se encuentra
	 */
	@Override
	public void eliminarLibro(Integer idLibro) throws ServicioException {
		log.info("[eliminarLibro]");
		log.debug("[idLibro: " + idLibro + "]");

		try {
			libroRepository.deleteById(idLibro);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}

	}

	/*
	 * Recupera los cuatro ultimos libros registrados en la bbdd, del mas reciente al menos
	 * @return una lista de los ultimos cuatro {@link Libro} incorporados
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Libro> buscarUltimosLibrosIncorporados() throws ServicioException {
		log.info("[listUltimosLibros]");

		List<Libro> libros;

		try {
			libros = libroRepository.buscarUltimosLibrosIncorporados();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libros;
	}

	/**
	 * Recupera la lista completa de los ultimos libros registrados, ordenados del mas reciente
	 * al que mas tiempo lleve registrado en la bbdd
	 * @return una lista de los ultimos {@link Libro} incoporados, ordenados cronologicamente
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Libro> buscarTodosUltimosLibrosIncorporados() throws ServicioException {
		log.info("[listTodosUltimosLibros]");

		List<Libro> libros;

		try {
			libros = libroRepository.buscarTodosUltimosLibrosIncorporados();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libros;
	}

	/**
	 * Recupera la lista de libros con su puntuacion media de las lecturas, ordenados 
	 * de la mas alta a la mas baja
	 * @return una lista de {@link Libro} con su media por orden decreciente
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Libro> listaLibrosMayorPuntuacion() throws ServicioException {
		log.info("[listPuntuacionLibros]");
		List<Libro> libros;

		try {
			libros = libroRepository.listaLibrosMayorPuntuacion();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libros;
	}

	/**
	 * Recupera la lista de los cuatro libros con mayor puntuacion de lectura, en orden descendente
	 * @return una lista de {@link Libro} con las cuatro mejores puntuaciones medias de lecturas
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Libro> librosMayorPuntuacion() throws ServicioException {
		log.info("[puntuacionLibros]");
		List<Libro> libros;

		try {
			libros = libroRepository.librosMayorPuntuacion();

		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libros;
	}

	/**
	 * Busqueda de libros por nombre del libro, autor, editorial o isbn en la bbdd
	 * @param clave La palabra clave ingresada y enviada en la peticion
	 * @return una lista de {@link Libro} que contengan coincidencias con esa palabra clave
	 * en alguno de sus campos definidos en la busqueda
	 * @throws ServicioException Si se produce un error durante la consulta
	 */
	@Override
	public List<Libro> busquedaLibros(String clave) throws ServicioException {
		log.info("[resultadoLibros]");
		List<Libro> libros;

		try {
			libros = libroRepository.buscarLibro(clave);
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libros;
	}

	/**
	 * Actualiza la informacion de un libro que ya existe en la bbdd. Valida la existencia
	 * del libro por el id y previene la duplicidad de nombres con otros registros
	 * @param libro El {@link Libro} a actualizar
	 * @return El libro tras ejecutarse la actualizacion
	 * @throws ServicioException Si el libro no existe o se produce un error al actualizar
	 */
	@Override
	public Libro modificarLibro(Libro libro) throws ServicioException {
		log.info("[actualizarLibro]");
		log.info("[libro: " + libro.toString() + "]");

		// Optional para comprobar si el registro existe antes de editar
		Optional<Libro> libroOp = libroRepository.findById(libro.getId());
		// Si el id no esta presente en la bbdd, lanza el error de libro no encontrado
		if (!libroOp.isPresent())
			throw new ServicioException(CodigoError.LIBRO_NOT_FOUND);

		/**
		 *  Formateado del texto. Primero quita los posibles espacios de delante y de detras, 
		 *  y despues transforma a mayuscula la inicial del nombre 
		 */
		String titulo = libro.getNombre().trim();
		titulo = titulo.substring(0, 1).toUpperCase() + titulo.substring(1);
		// Se almacena el nuevo nombre
		libro.setNombre(titulo);

		/**
		 *  Formateado del texto. Primero comprueba si el isbn no va vacio, y luego
		 *  quita los posibles espacios de delante y de detras
		 */
		String isbn = "";
		if (libro.getIsbn() != null) {
			isbn = libro.getIsbn().trim();
			libro.setIsbn(isbn);
		}

		/**
		 *  Formateado del texto. Primero comprueba si la sinopsis no va vacia, y luego
		 *  quita los posibles espacios de delante y de detras
		 */
		String sinopsis = "";
		if (libro.getSinopsis() != null) {
			sinopsis = libro.getSinopsis().trim();
			libro.setSinopsis(sinopsis);
		}

		try {
			// Verificacion de existencia del nombre del libro en la bbdd
			Libro libroNombre = libroRepository.findByName(libro.getNombre());
			/**
			 * Si se encuentra el libro por el nombre en la bbdd, pero es un libro con un id 
			 * distinto al que se va a actualizar, se lanza el error de libro encontrado
			 */
			if (libroNombre != null && libroNombre.getId() != libro.getId())
				throw new ServicioException(CodigoError.LIBRO_FOUND);
			// Comprobaciones si el isbn no esta vacio y nulo
			if (libro.getIsbn() != null && !libro.getIsbn().isEmpty()) {
				// Verificacion de existencia del isbn del libro en la bbdd
				Libro libroIsbn = libroRepository.findByIsbn(libro.getIsbn());
				// Si se encuentra, se lanza la excepcion de isbn encontrado al ser true
				if (libroIsbn != null)
					throw new ServicioException(CodigoError.ISBN_FOUND);
			}
			// Se guarda en la bbdd el libro actualizado
			libro = libroRepository.save(libro);
		} catch (ServicioException se) {
			log.error(se.getCodigo());
			log.error("ServicioException", se);
			throw se;
		} catch (Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL, e);
		}
		return libro;
	}

}
