import { Rol } from "./rol";

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    username: string;
    password: string;
    fechaNacimiento: Date;
    rol: Rol;
}