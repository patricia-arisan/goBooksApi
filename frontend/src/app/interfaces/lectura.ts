import { Estado } from "./estado";
import { Libro } from "./libro";
import { Usuario } from "./usuario";

export interface Lectura {
    id: number;
    puntuacion: number;
    estado: Estado;
    libro: Libro;
    usuario: Usuario;
}