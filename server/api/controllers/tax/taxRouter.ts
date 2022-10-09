import * as express from 'express';
import isAuthenticated from '../../middlewares/isAuthenticated';
import isAdmin from '../../middlewares/isAdmin';
import serviceChargeController from './taxController';

export default express
  .Router()
  .get('/', isAuthenticated, serviceChargeController.get)
  .put('/', isAuthenticated, isAdmin, serviceChargeController.update);
