import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import {sign} from "jsonwebtoken";
import {UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        // verificar se email existe
        const user = await usersRepositories.findOne({
            email
        })

        if(!user) {
            throw new Error("Email/Password incorrect")
        }
        // verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)
        // se não passar, cai no erro:
        if(!passwordMatch) {
            throw new Error ("Email/Password incorrect")
        }
        //se der certo, gerar o token:
        const token = sign({
            email: user.email
        }, "1c5c7896b55a1d863d3376659cb3780c", {
            subject: user.id,
            expiresIn: "1d"
            }
        );
        return token
    }
}

export { AuthenticateUserService }