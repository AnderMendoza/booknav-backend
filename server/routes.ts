import { Application } from 'express';
import boatTypeRouter from './api/controllers/boatType/boatTypeRouter';
import ghatRouter from './api/controllers/ghat/ghatRouter';
import userRouter from './api/controllers/user/userRouter';

export default function routes(app: Application) {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/ghat', ghatRouter);
  app.use('/api/v1/boat-type', boatTypeRouter);
}
