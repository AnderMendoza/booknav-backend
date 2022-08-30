import * as express from 'express';
import isNaavik from '../../middlewares/isNaavik';
import isAuthenticated from '../../middlewares/isAuthenticated';
import bankController from './bankController';

export default express
  .Router()
  .get('/:id', isAuthenticated, bankController.getById)
  .put('/:id', isAuthenticated, isNaavik, bankController.update)
  .delete('/:id', isAuthenticated, bankController.delete)
  .get('/', isAuthenticated, bankController.getAll)
  .post('/', isAuthenticated, isNaavik, bankController.add);
