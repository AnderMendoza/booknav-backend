import * as express from 'express';
import isAuthenticated from '../../middlewares/isAuthenticated';
import isAdmin from '../../middlewares/isAdmin';
import GhatController from './ghatController';
import upload from '../user/multer';

export default express
  .Router()
  .get('/:id', isAuthenticated, GhatController.getById)
  .put(
    '/:id/file',
    isAuthenticated,
    isAdmin,
    upload.single('picture'),
    GhatController.update
  )
  .get('/', isAuthenticated, GhatController.getAll)
  .post(
    '/file',
    isAuthenticated,
    isAdmin,
    upload.single('picture'),
    GhatController.add
  )
  .delete('/:id', isAuthenticated, isAdmin, GhatController.delete);
