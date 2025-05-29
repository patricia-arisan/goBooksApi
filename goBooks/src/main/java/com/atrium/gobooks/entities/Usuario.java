package com.atrium.gobooks.entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="USUARIO")
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USUARIO_ID")
	private Integer id;

	@Column(name = "USUARIO_NOMBRE")
	private String nombre;

	@Column(name = "USUARIO_APELLIDO")
	private String apellido;
		
	@Column(name = "USUARIO_EMAIL")
	private String username;

	@Column(name = "USUARIO_PASSWORD")
	private String password;

		
	@Column(name = "USUARIO_FECHANACIMIENTO")
	private Date fechaNacimiento;
	
	@ManyToOne
	@JoinColumn(name="ROL_ID")
	private Rol rol;
		
	public Usuario() {
			
	}

	public Usuario(String nombre, String apellido, String username, String password,
			Date fechaNacimiento, Rol rol) {
		super();
		this.nombre = nombre;
		this.apellido = apellido;
		this.username = username;
		this.password = password;
		this.fechaNacimiento = fechaNacimiento;
		this.rol = rol;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nombre=" + nombre + ", apellido=" + apellido + ", username=" + username
				+ ", password=" + password + ", fechaNacimiento=" + fechaNacimiento + ", rol=" + rol + "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}


	
}
