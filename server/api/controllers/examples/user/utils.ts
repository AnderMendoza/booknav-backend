import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Token from '../../../models/Token';
import { JWT_AUTH_TOKEN, JWT_REFRESH_TOKEN } from './userController';
import crypto from 'crypto';

const smsKey = process.env.SMS_SECRET_KEY || '';

export const createToken = async (
  payload: JwtPayload,
  userId: string,
  res: Response
) => {
  payload.data.userId = userId;
  const accessToken = jwt.sign(payload, JWT_AUTH_TOKEN, {
    expiresIn: '15m',
  });
  const token = jwt.sign(payload, JWT_REFRESH_TOKEN, {
    expiresIn: '30d',
  });

  try {
    const refreshToken = new Token();
    refreshToken.token = token;
    refreshToken._userId = userId;

    await Token.create(refreshToken);

    return res.status(201).send({
      accessToken,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: 'Error creating token',
    });
  }
};

export const generateOtp = (phone: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const ttl = 2 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto
    .createHmac('sha256', smsKey as 'BinaryLike | KeyObject')
    .update(data)
    .digest('hex');
  const fullHash = `${hash}.${expires}`;

  return { otp, fullHash };
};
