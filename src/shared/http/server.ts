import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/error/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(( error: Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof Error) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
})

app.listen(8000, () => {
    console.log('Server rodando na porta 8000!');
});
