import { celebrate, Joi, Segments } from "celebrate";
import multer = require("multer");
//const uploadConfig = require("uploadConfig");
import uploadConfig from '../config/upload'
import { Router } from "express";
import { isArray } from "util";
import UsersController from "../controller/user/UsersController";
import isAuthenticated from "../middlewares/isAuthenticateds";
import UserAvatarController from "../controller/user/UserAvatarController";


const usersController = new UsersController()
const usersRouter = Router()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

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


usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
    )

export default usersRouter;