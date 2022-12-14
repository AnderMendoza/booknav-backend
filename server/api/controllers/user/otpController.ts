import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Token from '../../models/Token';
import User from '../../models/User';
import { createToken, generateOtp } from './utils';
import { JWT_AUTH_TOKEN, JWT_REFRESH_TOKEN } from './userController';

const smsKey = process.env.SMS_SECRET_KEY;
// const twilioNum = process.env.TWILIO_PHONE_NUMBER;

export class OtpController {
  async otp(req: Request, res: Response) {
    const phone = req.body.phone;
    const { otp, fullHash } = generateOtp(phone);
    // client.messages
    //   .create({
    //     body: `Your One Time Login Password For CFM is ${otp}`,
    //     from: twilioNum,
    //     to: phone,
    //   })
    //   .then((messages) => console.log(messages))
    //   .catch((err) => console.error(err));

    // res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
    const user = await User.findOne({ phone });
    if (!user)
      return res.status(406).send({ message: 'Please create an account' });

    return res.status(200).send({ phone, hash: fullHash, otp }); // fix production // this bypass otp via api only for development instead hitting twilio api all the time
    // return res.status(200).send({ phone, hash: fullHash }); // Use this way in Production
  }

  async verify(req: Request, res: Response) {
    const phone = req.body.phone;
    const hash: string = req.body.hash;
    const otp = req.body.otp;
    const [hashValue, expires] = hash?.split('.');

    const now = Date.now();
    if (now > parseInt(expires)) {
      return res.status(504).send({ message: 'Timeout. Please try again' });
    }
    const data = `${phone}.${otp}.${expires}`;
    const newCalculatedHash = crypto
      .createHmac('sha256', smsKey as 'BinaryLike | KeyObject')
      .update(data)
      .digest('hex');

    if (newCalculatedHash === hashValue) {
      try {
        const user = await User.findOne({ phone });
        if (!user) throw new Error('Not found');
        return createToken({ phone, role: user.role }, user._id, res);
      } catch (error) {
        return res.status(406).send({ message: 'Please create an account' });
      }
    }

    return res
      .status(400)
      .send({ verification: false, message: 'Invalid OTP' });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.body.refresh;

    const rf = await Token.findOne({ token: refreshToken });

    try {
      if (!rf) throw new Error('Invalid refresh token');
      if (refreshToken && rf) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err: any, phone: any) => {
          if (err) throw new Error('Refresh token expired');
          const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
            expiresIn: process.env.JWT_AUTH_TOKEN_EXPIRY || '15m',
          });
          return res.status(200).send({ accessToken });
        });
      }
    } catch (error) {
      res.status(401).send({ message: 'Refresh token expired' });
    }
  }
}

export default new OtpController();
