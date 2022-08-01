import User from '../../models/User';
import Token from '../../models/Token';
import { Request, Response } from 'express';
import UserType from 'server/types/user';
import { generateOtp } from './utils';
import cloudinary from '../../middlewares/cloudinary';

// const twilioNum = process.env.TWILIO_PHONE_NUMBER;
export const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN || '';
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN || '';

export class Controller {
  //   accountSid = process.env.ACCOUNT_SID;
  //   authToken = process.env.AUTH_TOKEN;
  //   client = require("twilio")(accountSid, authToken);

  async register(req: Request, res: Response) {
    try {
      const { title, phone, role } = req.body;

      const newUser = new User();

      newUser.title = title;
      newUser.phone = phone;
      newUser.role = role ? (role === 'naavik' ? 'naavik' : 'user') : 'user';

      await User.create(newUser);

      const { otp, fullHash } = generateOtp(phone);

      return res.status(200).send({ phone, hash: fullHash, otp }); // fix production
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        message: 'Failed to add new User',
      });
    }
  }

  async logout(_req: Request, res: Response) {
    try {
      await Token.deleteMany({ _userId: res.locals?.user?.data });

      return res.status(200).send({ status: true });
    } catch (error) {
      return res.status(400).send({
        message: 'Error deleting token',
      });
    }
  }

  async me(_req: Request, res: Response) {
    try {
      if (res.locals?.token && res.locals?.user) {
        const userId = res.locals?.user?.data.data
          ? res.locals?.user?.data.data
          : res.locals?.user?.data;

        const user = await User.findById(userId);
        if (user) {
          return res.status(200).send(user);
        }
      }
      throw new Error('Not authenticated');
    } catch (error) {
      return res.status(400).send({
        message: 'No user found',
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const userId = res.locals?.user?.data.data
        ? res.locals?.user?.data.data
        : res.locals?.user?.data;

      const user = await User.findById(userId);

      if (user) {
        user.title = title;
        let url = '';
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          url = result.secure_url;
        }
        user.picture = url;
        await user.save();
        return res.status(200).send({
          message: 'User updated successfully',
        });
      }
      throw new Error('User not found');
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        message: 'Failed to update user',
      });
    }
  }

  async getAll(_req: Request, res: Response) {
    const users = await User.find().catch((err) =>
      res.status(400).send({ message: err.message })
    );
    if (Array.isArray(users)) {
      const filtered = users
        // .filter((user) => user.role !== "admin")
        .map((user: UserType) => {
          return {
            id: user.id,
            title: user.title,
            role: user.role,
            phone: user.phone,
          };
        });
      return res.status(200).send({ users: filtered });
    }
    return res.status(200).send([]);
  }
}

export default new Controller();
