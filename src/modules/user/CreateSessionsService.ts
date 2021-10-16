import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../../entity/User";
import AppError from "../../errors/AppError";
import UsersRepository from "../../repositories/UsersRepository";
import authConfig from "../../config/auth"

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

        const token = sign({},authConfig.jwt.secret,{
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        })

        return {
            user,
            token
        }
    }
}

export default CreateSessionsService