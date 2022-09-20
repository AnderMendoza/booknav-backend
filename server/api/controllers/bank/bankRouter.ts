import * as express from 'express';
import isNaavik from '../../middlewares/isNaavik';
import isAuthenticated from '../../middlewares/isAuthenticated';
import bankController from './bankController';
import isAdmin from '../../middlewares/isAdmin';

export default express
  .Router()
  .get('/:id', isAuthenticated, isAdmin, bankController.getById)
  .put('/:id', isAuthenticated, isNaavik, bankController.update)
  .delete('/:id', isAuthenticated, bankController.delete)
  .get('/', isAuthenticated, bankController.get)
  .post('/', isAuthenticated, isNaavik, bankController.add);
