import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import User from "../../entity/User";
import UsersRepository from "../../repositories/UsersRepository";

interface IRequest{
    id:string;
}

class ShowUserService{
    public async execute({id}:IRequest):Promise<User>{
        const userRepository = getCustomRepository(UsersRepository)

        const user = userRepository.findById(id)

        if(!user){
            throw new AppError("User not found");
        }
        return user
    }
}

export default ShowUserService;