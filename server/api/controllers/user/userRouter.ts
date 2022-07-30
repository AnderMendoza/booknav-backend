import * as express from 'express';
import controller from './userController';
import OtpController from './otpController';
import isAuthenticated from '../../middlewares/isAuthenticated';
import isAdmin from '../../middlewares/isAdmin';
import upload from './multer';

export default express
  .Router()
  .post('/register', controller.register)
  .post('/otp', OtpController.otp)
  .post('/verify', OtpController.verify)
  .post('/refresh', OtpController.refresh)
  .get('/logout', isAuthenticated, controller.logout)
  .get('/me', isAuthenticated, controller.me)
  .post(
    '/update',
    isAuthenticated,
    upload.single('picture'),
    controller.updateUser
  )
  .get('/all', isAuthenticated, isAdmin, controller.getAll);
