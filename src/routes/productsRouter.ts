import {Router} from 'express'
import ProductsController from '../controller/product/ProductsController';
import {celebrate,Joi,Segments} from 'celebrate'
import { join } from 'path';
const productsRouter = Router();
const productsControlller = new ProductsController()

productsRouter.get('/',productsControlller.index);

productsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]:{
            id:Joi.string().uuid().required(),
        },
    }),
    productsControlller.show);

productsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]:{
            name:Joi.string().required(),
            price:Joi.number().precision(2).required(),
            quantity:Joi.number().required(),
        },
    }),
    productsControlller.create);

productsRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]:{
            name:Joi.string().required(),
            price:Joi.number().precision(2).required(),
            quantity:Joi.number().required(),
        },
        [Segments.PARAMS]:{
            id:Joi.string().uuid().required()
        }
    }),
    productsControlller.update);

productsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]:{
            id:Joi.string().uuid().required(),
        }
    }),
    productsControlller.delete);

export default productsRouter;