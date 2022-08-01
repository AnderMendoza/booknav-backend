import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_AUTH_TOKEN } from '../controllers/user/userController';

export default async function isAdmin(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = res.locals?.token;

  if (accessToken)
    jsonwebtoken.verify(
      accessToken,
      JWT_AUTH_TOKEN,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (_err: any, payload: any) => {
        if (payload?.data?.role) {
          const role = payload.data.role;
          if (role === 'admin') next();
        } else {
          res.sendStatus(403);
        }
      }
    );
  else res.sendStatus(403);
}
