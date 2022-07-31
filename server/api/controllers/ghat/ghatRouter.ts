import * as express from 'express';
import isAuthenticated from '../../middlewares/isAuthenticated';
import isAdmin from '../../middlewares/isAdmin';
import GhatController from './ghatController';

export default express
  .Router()
  .get('/:id', isAuthenticated, GhatController.getById)
  .put('/:id', isAuthenticated, isAdmin, GhatController.update)
  .get('/', isAuthenticated, GhatController.getAll)
  .post('/', isAuthenticated, isAdmin, GhatController.add);
