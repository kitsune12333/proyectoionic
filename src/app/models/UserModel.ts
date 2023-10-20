import { TypeUser } from "./Type_user"

export interface UserModel {

    user_id: string
    name: string
    email: string
    phone: string
    type: TypeUser
    username: string,
    password: string
}