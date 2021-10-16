import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { isArray } from "util";
import UsersController from "../controller/user/UsersController";
import isAuthenticated from "../middlewares/isAuthenticateds";


const usersController = new UsersController()
const usersRouter = Router()


usersRouter.get('/',isAuthenticated,usersController.index)

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
            password:Joi.string().required()
        },
    }),
usersController.create,)

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