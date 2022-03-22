import {Router,Request,Response} from 'express';
import productsRouter from './modules/product/routes/productsRouter';
import passwordRouter from './modules/user/routes/passwordRouter';
;
import sessionRouter from './modules/user/routes/sessionsRouter';

import usersRouter from './modules/user/routes/usersRouter';

const routes = Router();

routes.get('/',(request: Request, response: Response) => {
    return response.json({message:'Hello dev'})
})

routes.use('/products',productsRouter)
routes.use('/users',usersRouter)
routes.use('/sessions',sessionRouter)
routes.use('/password',passwordRouter)

export default routes