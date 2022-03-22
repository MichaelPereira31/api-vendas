import { getCustomRepository } from "typeorm";

import path = require('path');
import uploadConfig from '../../../config/upload'
import UsersRepository from "../typeorm/repository/UsersRepository";
import User from "../typeorm/entity/User";
import AppError from "../../../errors/AppError";
//import fs = require('fs');

//import fs from "fs";
//import * as fs from 'fs';
const fs = require('fs');


interface IRequest {
    user_id: string;
    avatarFilename: string;
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