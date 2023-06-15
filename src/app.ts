import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import ApiError from './errors/ApiError';
import globalErrorHandler from './app/middlewares/golbalErrorHandler';
import { UsersRoute } from './app/modules/users/users.route';
const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', UsersRoute);

// testing
app.get('/', (req: Request, res: Response) => {
  res.send('hello');

  // await usersService.createUser({
  //   id: '999',
  //   role: 'student',
  //   password: '123456',
  // })
  // res.send('Hello World!');
});

// global error handeling
app.use(globalErrorHandler);

export default app;
