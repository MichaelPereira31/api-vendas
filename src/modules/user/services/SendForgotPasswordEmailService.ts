import { getCustomRepository } from "typeorm"
import AppError from "../../../errors/AppError"
import UsersRepository from "../typeorm/repository/UsersRepository"
import UserTokensRepository from "../typeorm/repository/UserTokensRepository"


class SendForgotPasswordEmailService{
    public async execute(email: string):Promise<void>{
        const userRepositoty = getCustomRepository(UsersRepository)
        const userTokenRepository = getCustomRepository(UserTokensRepository)

        const user = await userRepositoty.findByEmail(email) 

        if(!user){
            throw new AppError('User does not exist')
        }
        const token = await userTokenRepository.generate(user.id)
        // const token = await userTokenRepository.generate((await user).id)

        console.log(token)
        
    }
}

export default SendForgotPasswordEmailService