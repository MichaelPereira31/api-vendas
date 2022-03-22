import { getCustomRepository } from "typeorm"
import AppError from "../../../errors/AppError"
import { isAfter, addHours} from 'date-fns'
import UsersRepository from "../typeorm/repository/UsersRepository"
import UserTokensRepository from "../typeorm/repository/UserTokensRepository"
import { hash } from "bcryptjs"


interface IRequest{
    token:string;
    password: string;
}


class ResetPasswordService{ 
    public async execute({token,password}:IRequest):Promise<void>{
        const userRepositoty = getCustomRepository(UsersRepository)
        const userTokenRepository = getCustomRepository(UserTokensRepository)

        const userToken = await userTokenRepository.findByToken(token) 

        if(!userToken){
            throw new AppError('User token does not exist')
        }

        const user = await userRepositoty.findById(userToken.user_id)

        if(!user){
            throw new AppError('User does not exist')
        }

        const tokenCreated = userToken.created_at;
        const compareDate = addHours(tokenCreated, 2)

        if(isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired.')
        }

        user.password = await hash(password,8)

    }
}

export default ResetPasswordService