import { Rol } from "./rol";

export interface Usuario {
    id:number;
    nombre:string;
    apellido:string;
    email:string;
    password:string;
    fechaNacimiento:Date;
    rol:Rol;
}
