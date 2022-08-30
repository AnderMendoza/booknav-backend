import { Application } from 'express';
import bankRouter from './api/controllers/bank/bankRouter';
import boatTypeRouter from './api/controllers/boatType/boatTypeRouter';
import ghatRouter from './api/controllers/ghat/ghatRouter';
import naavRouter from './api/controllers/naav/naavRouter';
import userRouter from './api/controllers/user/userRouter';

export default function routes(app: Application) {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/ghat', ghatRouter);
  app.use('/api/v1/boat-type', boatTypeRouter);
  app.use('/api/v1/naav', naavRouter);
  app.use('/api/v1/bank', bankRouter);
}
