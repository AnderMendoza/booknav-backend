import * as express from 'express';
import isAuthenticated from '../../middlewares/isAuthenticated';
import notificationController from './notificationController';

export default express
  .Router()
  .post('/subscribe', isAuthenticated, notificationController.subscribe);
