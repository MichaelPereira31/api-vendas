import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import SessionsController from "../modules/user/controller/SessionsController";

const sessionRouter = Router()
const sessionsController = new SessionsController()

sessionRouter.post('/',celebrate({
    [Segments.BODY]:{
        email:Joi.string().email().required(),
        password: Joi.string().required()
    }
}),sessionsController.create)

export default sessionRouter

