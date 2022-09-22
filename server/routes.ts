import { Application } from 'express';
import bankRouter from './api/controllers/bank/bankRouter';
import boatTypeRouter from './api/controllers/boatType/boatTypeRouter';
import bookingRouter from './api/controllers/booking/bookingRouter';
import ghatRouter from './api/controllers/ghat/ghatRouter';
import naavRouter from './api/controllers/naav/naavRouter';
import notificationRouter from './api/controllers/notifications/notificationRouter';
import userRouter from './api/controllers/user/userRouter';

export default function routes(app: Application) {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/ghat', ghatRouter);
  app.use('/api/v1/boat-type', boatTypeRouter);
  app.use('/api/v1/naav', naavRouter);
  app.use('/api/v1/bank', bankRouter);
  app.use('/api/v1/booking', bookingRouter);
  app.use('/api/v1/notification', notificationRouter);
}
