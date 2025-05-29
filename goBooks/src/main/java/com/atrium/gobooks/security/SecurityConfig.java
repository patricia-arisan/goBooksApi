package com.atrium.gobooks.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.atrium.gobooks.services.ServicioUsuario;

@Configuration
@EnableWebSecurity

public class SecurityConfig {
//err too many redirects? se ha puesto extends websecurityconfiguration	
	@Autowired
	private ServicioUsuario usuarioServicio;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http
			
			.cors(Customizer.withDefaults()) 
			
			.authorizeHttpRequests((authz) -> authz
					.requestMatchers("/","/api/login/**", "/api/registroUsuario/**", "/js/**", "/css/**", "/img/**").permitAll()
					.anyRequest().authenticated())
			//.formLogin(Customizer.withDefaults())
			.formLogin((form) -> form
					//.formLogin(withDefaults());
					.loginPage("/login")
					.failureUrl("/loginError")
					.successForwardUrl("/user").permitAll()
					)
			.logout((logout) -> logout
					.logoutUrl("/auth/logout")
					.logoutSuccessUrl("/login?logout").permitAll()
					)
			
		.httpBasic(Customizer.withDefaults())
		.csrf((csrf) -> csrf
				.disable()
				//.csrf((AbstractHttpConfigurer::disable)
				)
		.headers((headers)-> headers
				.disable());
		
		return http.build();
		
//		http.authorizeHttpRequests().requestMatchers("/registro**", "/js/**", "/css/**", "/img/**").permitAll()
//				.anyRequest().authenticated().and().formLogin().loginPage("/login").permitAll().and().logout()
//				.invalidateHttpSession(true).clearAuthentication(true)
//				.logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login?logout")
//				.permitAll();
//		return http.build();
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource(){
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST","UPDATE","DELETE"));
		configuration.setAllowedHeaders(List.of("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
		
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {

		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(4);





//que inicies la aplicacion, por lo cual tus contrasenas encriptadas no funcionaran bien

		return bCryptPasswordEncoder;

	}


//	  @Bean public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception { return
//	  authenticationConfiguration.getAuthenticationManager(); }
	
	@Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usuarioServicio).passwordEncoder(passwordEncoder());
    }
	  
//	  @Bean public DaoAuthenticationProvider authenticationProvider() {
//	  DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
//	  auth.setUserDetailsService(usuarioServicio);
//	  auth.setPasswordEncoder(passwordEncoder());
//	  
//	  return auth; }
	  
	  @Autowired public void configureGlobal(AuthenticationManagerBuilder auth)
	  throws Exception {
	  auth.userDetailsService(usuarioServicio).passwordEncoder(passwordEncoder());
	  }
	 

}
