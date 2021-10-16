import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import UsersRepository from "../../repositories/UsersRepository";
import path = require('path');
import uploadConfig from '../../config/upload'
import fs = require('fs');
import { deflate } from "zlib";
import User from "../../entity/User";


interface IRequest{
    user_id:string;
    avatarFilename:string;
}

class UpdateUserAvatarService{

    public async execute({user_id,avatarFilename}: IRequest):Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new AppError('User not fonud')
        }

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFilename

        await usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService