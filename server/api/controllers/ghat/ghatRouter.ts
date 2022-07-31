import * as express from 'express';
import isAuthenticated from '../../middlewares/isAuthenticated';
import isAdmin from '../../middlewares/isAdmin';
import GhatController from './ghatController';

export default express
  .Router()
  .get('/:id', isAuthenticated, isAdmin, GhatController.getById)
  .get('/all', isAuthenticated, isAdmin, GhatController.getAll);
