package com.atrium.gobooks.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
//import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Configuration
////@EnableRedisHttpSession
public class HttpSessionConfig {
	@Bean
	public static ConfigureRedisAction configureRedisAction() {
		return ConfigureRedisAction.NO_OP;
	}
	 @Bean
	    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
	        return new GenericJackson2JsonRedisSerializer();
	    }
}
