import {Router,Request,Response} from 'express';
import productsRouter from './routes/productsRouter';
import sessionRouter from './routes/sessionsRouter';

import usersRouter from './routes/usersRouter';

const routes = Router();

routes.get('/',(request: Request, response: Response) => {
    return response.json({message:'Hello dev'})
})

routes.use('/products',productsRouter)
routes.use('/users',usersRouter)
routes.use('/sessions',sessionRouter)

export default routes