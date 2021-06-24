// -> server (recebe req) -> controller -> service 
// entao vamos ao controller:
import {Request, Response} from "express";
import { CreateUserService } from "../services/CreateUserService"



class CreateUserController {
    async handle(request: Request, response: Response) {      
        //tratar as exceções no service para escalar a aplicação
        // ele pega os dados e envia para o service.
        const {name, email, admin, password} = request.body;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({name, email, admin, password})

        return response.json(user)
    }
}

export {CreateUserController}

