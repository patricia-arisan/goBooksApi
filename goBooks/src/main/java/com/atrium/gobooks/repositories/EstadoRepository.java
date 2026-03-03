package com.atrium.gobooks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atrium.gobooks.entities.Estado;

/**
 * Repositorio para gestionar la persistencia de los datos del Estado
 */
public interface EstadoRepository extends JpaRepository<Estado, Integer>{

}
