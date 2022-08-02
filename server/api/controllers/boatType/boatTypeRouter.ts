import * as express from 'express';
import isAuthenticated from '../../middlewares/isAuthenticated';
import isAdmin from '../../middlewares/isAdmin';
import boatTypeController from './boatTypeController';

export default express
  .Router()
  .get('/:id', isAuthenticated, boatTypeController.getById)
  .put('/:id', isAuthenticated, isAdmin, boatTypeController.update)
  .delete('/:id', isAuthenticated, isAdmin, boatTypeController.delete)
  .get('/', isAuthenticated, boatTypeController.getAll)
  .post('/', isAuthenticated, isAdmin, boatTypeController.add);
