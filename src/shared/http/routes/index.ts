import { Router } from 'express';
import express from 'express';

const routes = Router();

routes.get('/', (response, request ) => {
    return response.json({ mesage: 'helloDev!'});
});

export default routes;
