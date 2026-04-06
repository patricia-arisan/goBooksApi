package com.atrium.gobooks.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.sql.Date;
import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.atrium.gobooks.entities.Rol;
import com.atrium.gobooks.entities.Usuario;
import com.atrium.gobooks.exceptions.CodigoError;
import com.atrium.gobooks.exceptions.ServicioException;
import com.atrium.gobooks.repositories.UsuarioRepository;

import jakarta.persistence.EntityManager;

@SpringBootTest
@Transactional
public class ServicioUsuarioImplTest {
	
	@Autowired
	private ServicioUsuarioImpl servicioUsuario;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private EntityManager entityManager;
	
	private Rol rol;
	
	@BeforeEach
	public void iniciarDatos() {
		rol = new Rol();
		rol.setId(2);
		rol.setNombre("Usuario");
	}
	
	@Test
	public void registrarTest() throws ServicioException {
		Usuario usuario = new Usuario();
		usuario.setUsername("usuario@prueba.com");
		usuario.setPassword("123456");
		usuario.setNombre("Usuario");
		usuario.setApellido("Prueba");
		usuario.setFechaNacimiento(Date.valueOf(LocalDate.now()));		
		usuario.setRol(rol);
		
		Usuario guardado = servicioUsuario.registrar(usuario);
		
		assertThat(guardado.getId()).isNotNull();
        assertThat(guardado.getUsername()).isEqualTo("usuario@prueba.com");
	}
	
	@Test
	public void registrarDuplicadoTest() {
		usuarioRepository.save(new Usuario("Usuario", "Prueba", "usuario@prueba.com", "123456", Date.valueOf(LocalDate.now()), rol));
	
		Usuario duplicado = new Usuario("Usuario", "Test", "usuario@prueba.com", "123456", Date.valueOf(LocalDate.now()), rol);
		
		ServicioException se = assertThrows(ServicioException.class, () -> {
            servicioUsuario.registrar(duplicado);
        });

        assertThat(se.getCodigo()).isEqualTo(CodigoError.USUARIO_FOUND);
	}
	
	@Test
	public void loadUserByUsernameTest() {
		usuarioRepository.save(new Usuario("Usuario", "Prueba", "usuario@prueba.com", "123456", Date.valueOf(LocalDate.now()), rol));
		
		UserDetails details = servicioUsuario.loadUserByUsername("usuario@prueba.com");
		
		assertThat(details).isNotNull();
        assertThat(details.getUsername()).isEqualTo("usuario@prueba.com");
        
	}
	
	@Test
    public void loadUserByUsernameNotFoundTest() {
        assertThrows(UsernameNotFoundException.class, () -> {
            servicioUsuario.loadUserByUsername("username@prueba.com");
        });
    }
	

	@Test
    public void modificarPasswordTest() throws ServicioException {
        Usuario inicial = usuarioRepository.save(new Usuario("Usuario", "Prueba", "usuario@prueba.com", 
                passwordEncoder.encode("123456"), Date.valueOf(LocalDate.now()), rol));
        Integer id = inicial.getId();

        entityManager.flush();
        entityManager.clear();

        Usuario actualizado = servicioUsuario.modificarPassword("654321", id);

        assertThat(passwordEncoder.matches("654321", actualizado.getPassword())).isTrue();
        assertThat(passwordEncoder.matches("123456", actualizado.getPassword())).isFalse();
    }
	
	@Test
    public void modificarTest() throws ServicioException {
        Usuario inicial = usuarioRepository.save(new Usuario("Usuario", "Prueba", "usuario@prueba.com", 
                "123456", Date.valueOf(LocalDate.now()), rol));
        
        inicial.setNombre("Usuaria");
        Usuario modificado = servicioUsuario.modificar(inicial);

        assertThat(modificado.getNombre()).isEqualTo("Usuaria");
    }
	
	@Test
    public void eliminarUsuarioTest() throws ServicioException {
        Usuario usuario = usuarioRepository.save(new Usuario("Usuario", "Prueba", "usuario@prueba.com", 
                "123456", Date.valueOf(LocalDate.now()), rol));
        Integer id = usuario.getId();

        servicioUsuario.eliminarUsuario(id);

        assertThat(usuarioRepository.findById(id)).isEmpty();
    }
	
	@Test
	public void conseguirUsuarioTest() throws ServicioException {
		Usuario user = usuarioRepository.save(new Usuario("Usuario", "Prueba", "usuario@prueba.com", 
                "123456", Date.valueOf(LocalDate.now()), rol));
		Integer id = user.getId();

		entityManager.flush();
		entityManager.clear();

		Usuario encontrado = servicioUsuario.conseguirUsuario(id);

		assertThat(encontrado).isNotNull();
		assertThat(encontrado.getId()).isEqualTo(id);
		assertThat(encontrado.getUsername()).isEqualTo("usuario@prueba.com");
	}
}
