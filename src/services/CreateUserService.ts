//somente o que for relacionado a criação de usuario 
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import {hash} from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password} : IUserRequest) {
        const usersRepository =  getCustomRepository(UsersRepositories)  // new UsersRepositories(); // esse new repository na vdd tem um extensor modificando entao import typeorm

        // verificar se o email está preenchido
        if(!email) {
            throw Error("Email invalid")
        }
        // verifico se o  usuario já existe
        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        
        // lanço um erro:
        if(userAlreadyExists) {
            throw Error("Usuário already exists")
        }

        //obs: encryptar a senha pro bd 

        const passwordHash = await hash(password, 8)
        
        // se continuar o fluxo;
        // cria uma instancia de um novo objeto para salvar

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        })

        await usersRepository.save(user);
        return user;
    }
}

export { CreateUserService}