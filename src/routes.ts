import {Router,Request,Response} from 'express';
import productsRouter from './routes/productsRouter';

const routes = Router();

routes.get('/',(request: Request, response: Response) => {
    return response.json({message:'Hello dev'})
})

routes.use('/products',productsRouter)

export default routes