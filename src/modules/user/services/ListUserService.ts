import { getCustomRepository } from "typeorm";
import User from "../typeorm/entity/User";
import UsersRepository from "../typeorm/repository/UsersRepository";


class ListUserService{
    public async execute():Promise<User[]>{
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find();

        return users
    }
}

export default ListUserService