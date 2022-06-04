import * as express from 'express';
import controller from './userController';
import OtpController from './otpController';
import isAuthenticated from '../../middlewares/isAuthenticated';
import isAdmin from '../../middlewares/isAdmin';

export default express
  .Router()
  .post('/register', controller.register)
  .post('/otp', OtpController.otp)
  .post('/verify', OtpController.verify)
  .post('/refresh', OtpController.refresh)
  .get('/logout', isAuthenticated, controller.logout)
  .get('/me', isAuthenticated, controller.me)
  .get('/all', isAuthenticated, isAdmin, controller.getAll);
