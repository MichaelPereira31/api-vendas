import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import User from "../../entity/User";
import UsersRepository from "../../repositories/UsersRepository";

interface IRequest{
    id:string;
    name:string;
    email:string;
    password:string;
}

class UpdateUserService{
    public async execute({id,name,email,password}: IRequest):Promise<User>{
        const userRepository = getCustomRepository(UsersRepository)

        const user = await userRepository.findById(id)

        if(!user){
            throw new AppError('User not found.')
        }

        const userExist = userRepository.findByEmail(email)

        if(userExist){
            throw new AppError('There is already one product with this email')
        }

        user.name = name
        user.email = email
        user.password = password

        await userRepository.save(user);
        return user
    }
}

export default UpdateUserService