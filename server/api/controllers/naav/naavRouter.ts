import * as express from 'express';
import isPrivileged from '../../middlewares/isPrivileged';
import isAdmin from '../../middlewares/isAdmin';
import isAuthenticated from '../../middlewares/isAuthenticated';
import isNaavik from '../../middlewares/isNaavik';
import upload from '../user/multer';
import naavController from './naavController';

export default express
  .Router()
  .get('/:id', isAuthenticated, naavController.getById)
  .put(
    '/:id/file',
    isAuthenticated,
    isNaavik,
    upload.single('picture'),
    naavController.update
  )
  .put('/:id/status', isAuthenticated, isAdmin, naavController.status)
  .delete('/:id', isAuthenticated, isPrivileged, naavController.delete)
  .get('/', isAuthenticated, naavController.getAll)
  .post(
    '/file',
    isAuthenticated,
    isNaavik,
    upload.single('picture'),
    naavController.add
  )
  .put('/:id/review', isAuthenticated, naavController.review)
  .delete(
    '/:id/review/:reviewId',
    isAuthenticated,
    naavController.deleteReview
  );
