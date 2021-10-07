import { getCustomRepository } from "typeorm";
import User from "../../entity/User";
import AppError from "../../errors/AppError";
import UsersRepository from "../../repositories/UsersRepository";

interface IRequest{
    name:string;
    email:string;
    password:string;

}

class CreateUserService{
    public async execute({name,email,password}:IRequest):Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);
        const userExist = await usersRepository.findByEmail(email);

        if(userExist){
            throw new AppError('Email address already used')
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        })

        await usersRepository.save(user);

        return user

    }
}

export default CreateUserService;