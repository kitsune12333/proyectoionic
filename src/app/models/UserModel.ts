import { TypeUser } from "./Type_user"

export interface UserModel {

    id: string;
    username: string;
    password: string;
    correo: string;
    phone: string;
    type: TypeUser;
    nombre: string;
    tipoCarrera: string;
}