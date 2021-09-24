import express from 'express';
import cors from 'cors';
import routes from './routes';


const app = express();

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
    console.log('Server rodando na porta 8000!');
});
