
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/users', UserRoutes)




app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});


//global error Handling middleware
app.use(globalErrorHandler)

export default app;
