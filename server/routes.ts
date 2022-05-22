import { Application } from 'express';
import userRouter from './api/controllers/examples/user/userRouter';

export default function routes(app: Application) {
  app.use('/api/v1/users', userRouter);
}
