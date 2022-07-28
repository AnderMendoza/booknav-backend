import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_AUTH_TOKEN } from '../controllers/user/userController';

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers['authorization'];
  if (
    !(
      typeof bearerHeader !== 'string' ||
      !bearerHeader?.split(' ')?.[1] ||
      bearerHeader === undefined
    )
  ) {
    const bearer = bearerHeader?.split(' ');
    const bearerToken = bearer[1];

    res.locals.token = bearerToken;
    const accessToken = bearerToken;

    if (accessToken) {
      try {
        jsonwebtoken.verify(
          accessToken,
          JWT_AUTH_TOKEN,
          async (err, payload) => {
            if (payload) {
              res.locals.user = payload;
              next();
            } else if (err?.message === 'jwt expired') {
              res.sendStatus(401);
            } else res.sendStatus(401);
          }
        );
      } catch (error) {
        res.sendStatus(401);
      }
    }
  } else res.sendStatus(403);
}
