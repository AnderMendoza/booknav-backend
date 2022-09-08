import * as express from 'express';
import isAuthenticated from '../../middlewares/isAuthenticated';
import isAdmin from '../../middlewares/isAdmin';
import bookingController from './bookingController';

export default express
  .Router()
  .get('/:id', isAuthenticated, bookingController.getById)
  .get('/', isAuthenticated, bookingController.getAll)
  .post('/', isAuthenticated, bookingController.add)
  .put('/:id', isAuthenticated, isAdmin, bookingController.update)
  .delete('/:id', isAuthenticated, isAdmin, bookingController.delete);
