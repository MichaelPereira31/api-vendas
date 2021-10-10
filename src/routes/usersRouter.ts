import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import UsersController from "../controller/user/UsersController";


const usersController = new UsersController()
const usersRouter = Router()


usersRouter.get('/',usersController.index)

usersRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]:{
            id:Joi.string().uuid().required(),
        }
    }),usersController.show
)

usersRouter.post('/',
    celebrate({
        [Segments.BODY]:{
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().required(),
        }
    })
,usersController.create)

usersRouter.put('/:id',celebrate({
    [Segments.BODY]:{
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    },
    [Segments.PARAMS]:{
        id:Joi.string().uuid().required()
    }
}),usersController.update)

export default usersRouter;