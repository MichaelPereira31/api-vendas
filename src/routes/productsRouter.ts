import {Router} from 'express'
import ProductsController from '../controller/product/ProductsController';

const productsRouter = Router();
const productsControlller = new ProductsController()

productsRouter.get('/',productsControlller.index);
productsRouter.get('/:id',productsControlller.show);
productsRouter.post('/',productsControlller.create);
productsRouter.put('/:id', productsControlller.update);
productsRouter.delete('/:id',productsControlller.delete)

export default productsRouter;