package com.atrium.gobooks.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;

/**
 * Apartado de configuracion de la seguridad de la aplicacion.
 * Define las las reglas de acceso, politicas de cors, encriptacion de password
 * y la cadena de filtros de seguridad
 */
@Configuration
@EnableWebSecurity
// Para permitir el uso de @PreAuthorize en los controladores
@EnableMethodSecurity(prePostEnabled = true) 
public class SecurityConfig {

	/**
	 * Define la cadena de filtros de seguridad, SecurityFilterChain.
	 * Configura las rutas que son publicas y las que no lo son 
	 * @param http El objeto HttpSecurity para configurar la seguridad web
	 * @return El filtro ya configurado
	 * @throws Exception Si ocurre un error durante la configuracion
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				// Configuracion de cors en funcion del Bean que aparece posteriormente
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				// Reglas de autorizacion de peticiones
				.authorizeHttpRequests((authz) -> authz
						// Endpoints publicos
						.requestMatchers("/", "/api/login/**", "/api/registroUsuario/**", "/js/**", "/css/**", "/img/**").permitAll()
						// El resto de peticiones con autenticacion del usuario
						.anyRequest().authenticated()
				)
				// Configuracion de autenticacion basica personalizada, evita ventana emergente
				.httpBasic(basic -> basic
					    .authenticationEntryPoint((request, response, authException) -> {
					        // Se establece el status 401 Unauthorized con un json
					        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					        response.setContentType("application/json");
					        // Mensaje de error
					        response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"Credenciales incorrectas\"}");
					    })
					)
				// Configuracion de cierre de sesion
				.logout((logout) -> logout
						.logoutUrl("/auth/logout")
						// Devuelve un estado 200 Ok en vez de redireccionar
						.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
						.permitAll()
				)
				// Desactiva csrf
				.csrf((csrf) -> csrf.disable());

		return http.build();

	}

	/**
	 * Configuracion del mecanismo de seguridad de los cors.
	 * Se definen las conexiones de la api y los metodos permitidos
	 * @return La configuracion resultante de cors
	 */
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		// Origen de la aplicacion
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		// Metodos HTTP permitidos
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"));
		// Permiso de envio de credenciales, como cookies o cabeceras de autenticacion
		configuration.setAllowCredentials(true);
		// Se permiten todas las cabeceras
		configuration.setAllowedHeaders(List.of("*"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		// Aplicacion de la configuracion a todas las cabeceras
		source.registerCorsConfiguration("/**", configuration);
		return source;

	}

	/**
	 * Bean para la encriptacion de la password
	 * @return El bean de BCryptPasswordEncoder con fuerza de hash nivel 4
	 */
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(4);

		return bCryptPasswordEncoder;

	}

}
