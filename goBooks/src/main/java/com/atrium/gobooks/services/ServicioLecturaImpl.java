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

@Service
public class ServicioLecturaImpl implements ServicioLectura{
	
Logger log = LoggerFactory.getLogger(ServicioLecturaImpl.class);
	
	@Autowired
	LecturaRepository lecturaRepository;

	@Autowired
	LibroRepository libroRepository;
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	EstadoRepository estadoRepository;
	
	
	@Override
	public Lectura grabarLectura(LecturaDTO lecturaDTO) throws ServicioException {
		log.info("[grabarLectura]");
		log.info("lectura: "+lecturaDTO.toString());
		
		Lectura lectura = new Lectura();
		try {
			Optional<Usuario> usuarioOp;
			usuarioOp = usuarioRepository.findById(lecturaDTO.getIdUsuario());
			if(!usuarioOp.isPresent()) throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
			lectura.setUsuario(usuarioOp.get());
			
			Optional<Libro> libroOp;
			libroOp = libroRepository.findById(lecturaDTO.getIdLibro());
			if(!libroOp.isPresent()) throw new ServicioException(CodigoError.LIBRO_NOT_FOUND);
			lectura.setLibro(libroOp.get());
			
			Optional<Estado> estadoOp;
			estadoOp = estadoRepository.findById(lecturaDTO.getIdEstado());
			if(!estadoOp.isPresent()) throw new ServicioException(CodigoError.ESTADO_NOT_FOUND);
			lectura.setEstado(estadoOp.get());
			
			lectura.setPuntuacion(lecturaDTO.getPuntuacion());
			
			lecturaRepository.save(lectura);
			
		}catch(Exception e){
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		
		return lectura;
	}


	@Override
	public List<Lectura> buscarLecturasUsuario(Integer id) throws ServicioException {
		log.info("[listLecturas]");
		
		List<Lectura> lecturas;
		
		try {
			lecturas= lecturaRepository.buscarLecturasUsuario(id);
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return lecturas;
	}


	@Override
	public List<Lectura> buscarLecturasEstadoUsuario(Integer idUsuario, Integer idEstado) throws ServicioException {
		log.info("[listLecturasEstado]");
				
		List<Lectura> lecturas;
		
		try {
			lecturas= lecturaRepository.buscarLecturasEstadoUsuario(idUsuario, idEstado);
			log.info("lectura: "+lecturas.toString());
			
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return lecturas;
	}


	@Override
	public Lectura buscarLecturaUsuario(Integer idLibro, Integer idUsuario) throws ServicioException {
		Libro libro;
		Usuario usuario;
		Lectura lectura;
		try {
			Optional<Libro> libroOp= libroRepository.findById(idLibro);
			if(!libroOp.isPresent()) throw new ServicioException(CodigoError.LIBRO_NOT_FOUND);
			libro= libroOp.get();
			Optional<Usuario> usuarioOp= usuarioRepository.findById(idLibro);
			if(!usuarioOp.isPresent()) throw new ServicioException(CodigoError.USUARIO_NOT_FOUND);
			usuario= usuarioOp.get();
			
			lectura= lecturaRepository.buscarLecturaUsuario(idLibro, idUsuario);
		}catch(ServicioException se) {
			log.error("ServicioException", se);
			throw se;
		}catch(Exception e) {
			log.error("Exception", e);
			throw new ServicioException(CodigoError.ERROR_GENERAL,e);
		}
		return lectura;
	}


	
}
