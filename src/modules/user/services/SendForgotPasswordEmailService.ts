import { getCustomRepository } from "typeorm"
import AppError from "../../../errors/AppError"
import { UserToken } from "../typeorm/entity/UserToken"
import UsersRepository from "../typeorm/repository/UsersRepository"
import UserTokensRepository from "../typeorm/repository/UserTokensRepository"
import EtherealMail from '../../../config/mail/EtherealMail'


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

        //console.log(token)

        await EtherealMail.sendMail({
            to: email,
            body: `Solicitação de redefinição de senha recebida: ${token.token}`,
        })

    }
}

export default SendForgotPasswordEmailService