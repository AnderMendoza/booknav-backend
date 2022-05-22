import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_AUTH_TOKEN } from '../controllers/examples/user/userController';

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers['authorization'];
  if (
    typeof bearerHeader !== 'string' ||
    !bearerHeader?.split(' ')?.[1] ||
    bearerHeader === undefined
  ) {
    return res.status(403).send({ message: 'Not Allowed' });
  }
  const bearer = bearerHeader?.split(' ');
  const bearerToken = bearer[1];

  res.locals.token = bearerToken;
  const accessToken = bearerToken;

  if (accessToken) {
    jsonwebtoken.verify(accessToken, JWT_AUTH_TOKEN, async (err, payload) => {
      if (payload) {
        res.locals.user = payload;
        next();
      }
      if (err?.message === 'TokenExpiredError') {
        return res.status(401).send({
          success: false,
          message: 'Access token expired',
        });
      }
      return res.status(403).send({ err, message: 'User not authenticated' });
    });
  }
  return res.status(403).send({ message: 'Not Allowed' });
}
