import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../../entity/User";
import AppError from "../../errors/AppError";
import UsersRepository from "../../repositories/UsersRepository";

interface IRequest{
    email: string;
    password:string;
}

interface IResponse{
    user: User;
    token:string;
}

class CreateSessionsService{
    public async execute({email,password}:IRequest):Promise<IResponse>{
        const usersRepository = getCustomRepository(UsersRepository)
        const user = await usersRepository.findByEmail(email);
        if(!user){
            throw new AppError('Incorrect email/password combination.',401)
        }
        const passwordCorfirmed = await compare(password,user.password)
        if(!passwordCorfirmed){
            throw new AppError('Incorrect email/password combination.',401)
        }

        const token = sign({},'888ef29f04be2029b4096e855f1e543b',{
            subject: user.id,
            expiresIn: '1d',
        })

        return {
            user,
            token
        }
    }
}

export default CreateSessionsService