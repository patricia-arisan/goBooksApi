package com.atrium.gobooks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atrium.gobooks.entities.Rol;

/**
 * Repositorio para gestionar la persistencia de datos del Rol
 */
public interface RolRepository extends JpaRepository<Rol, Integer>{

}
