import { Estado } from "./estado";
import { Libro } from "./libro";
import { Usuario } from "./usuario";

export interface Lectura {
    puntuacion:number;
    estado:Estado;
    libro:Libro;
    usuario:Usuario;
}
