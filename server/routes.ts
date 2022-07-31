import { Application } from 'express';
import ghatRouter from './api/controllers/ghat/ghatRouter';
import userRouter from './api/controllers/user/userRouter';

export default function routes(app: Application) {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/ghat', ghatRouter);
}
