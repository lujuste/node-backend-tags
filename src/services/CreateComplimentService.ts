import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({tag_id, user_receiver, user_sender, message}:IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories =  getCustomRepository(UsersRepositories);
        //se for o mesmo usuario não pode
        if(user_sender === user_receiver) {
            throw new Error ("User Receiver Incorrect")
        }
        //verificando se o usuario receiver é valido
        const userReceiverExists = await usersRepositories.findOne({
            id: user_receiver
        })
        // se não for valido passo o erro
        if(!userReceiverExists) {
            throw new Error ("User Receiver does not exists")
        }
        //entao cria o elogio!

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        //salvar

        await complimentsRepositories.save(compliment)

        return compliment;
    }
}

export {CreateComplimentService}