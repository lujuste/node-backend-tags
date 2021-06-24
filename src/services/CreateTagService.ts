import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"


// pode passar direto na função execute como parametro pois só tem 1 dado sendo o nome, o restante é tudo automatico
class CreateTagService { 
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories)
        //verifica entao se ja tem nome preenchido 
        if (!name) {
            throw new Error("Incorrect name!");
        }
        // se não pode seguir o fluxo verificando então se ela já existe
        // SELECT * FROM TAGS WHERE NAME = 'name'
        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        })
        // essa verificação então passando erro se existir
        if (tagAlreadyExists) {
            throw new Error("Tag already exists")
        }
        // se não segue criando, salvando e retornando a tag 
        const tag = tagsRepositories.create({
            name
        })

        await tagsRepositories.save(tag)
        return tag

    }
}

export { CreateTagService }