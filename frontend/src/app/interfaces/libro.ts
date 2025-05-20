import { Autor } from "./autor";
import { Editorial } from "./editorial";
import { Genero } from "./genero";

export interface Libro {
    id:number;
    nombre:string;
    autor:Autor;
    isbn:string;
    sinopsis:string;
    editorial:Editorial;
    genero:Genero;
    portada:string;
}
