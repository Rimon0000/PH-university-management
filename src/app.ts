
import express, { Application, Request, Response, text } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router)



const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
}

app.get('/', test);


//global error Handling middleware
app.use(globalErrorHandler)

//not found
app.use(notFound)

export default app;
