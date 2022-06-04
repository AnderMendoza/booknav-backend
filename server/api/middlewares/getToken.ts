import { NextFunction, Request, Response } from 'express';

export default function getToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    res.locals.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.status(403).send({ message: 'Not Allowed' });
  }
}
