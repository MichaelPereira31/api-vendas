import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../../entity/User";
import AppError from "../../errors/AppError";
import UsersRepository from "../../repositories/UsersRepository";

interface IRequest{
    email: string;
    password:string;
}
/*
interface IResponse{
    user: User;
}*/

class CreateSessionsService{
    public async execute({email,password}:IRequest):Promise</*IResponse |*/ User>{
        const usersRepository = getCustomRepository(UsersRepository)
        const user = await usersRepository.findByEmail(email);
        if(!user){
            throw new AppError('Incorrect email/password combination.',401)
        }
        const passwordCorfirmed = await compare(password,user.password)
        if(!passwordCorfirmed){
            throw new AppError('Incorrect email/password combination.',401)
        }

        return user
    }
}

export default CreateSessionsService