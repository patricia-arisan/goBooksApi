package com.atrium.gobooks.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;

/**
 * Configuracion de Spring Session orientada al uso de Redis como almacenamiento.
 * Gestiona la serializacion de datos y la interaccion con el servidor
 */
@Configuration
public class HttpSessionConfig {
	/**
	 * Deshabilita la configuracion automatica, no ejecuta el comando CONFIG en Redis 
	 * @return una accion NO_OP que no realiza acciones de configuracion en Redis
	 */
	@Bean
	public static ConfigureRedisAction configureRedisAction() {
		return ConfigureRedisAction.NO_OP;
	}

	/**
	 * Define el serializador por defecto para los datos de sesion de Redis.
	 * Se utiliza json en vez de la serializacion nativa de Java para que sea mas legible
	 * @return el serializador de objetos basado en json
	 */
	@Bean
	public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
		return new GenericJackson2JsonRedisSerializer();
	}
}
