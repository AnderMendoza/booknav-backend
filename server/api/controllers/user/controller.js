import User from "../../models/user";
import { createToken } from "./createToken";
import Token from "../../models/token";

// const twilioNum = process.env.TWILIO_PHONE_NUMBER;
export const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

export class Controller {
  //   accountSid = process.env.ACCOUNT_SID;
  //   authToken = process.env.AUTH_TOKEN;
  //   client = require("twilio")(accountSid, authToken);

  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    const user = await User.findOne({ $or: [{ email }, { phone }] }).catch(
      () => {
        res.status(400).send({
          message: "Incorrect Email or password",
        });
      }
    );

    if (user === null) {
      return res.status(400).send({
        message: "Incorrect Email or password",
      });
    } else {
      if (user.validPassword(password)) {
        return createToken({ email, role: user.role, phone }, user._id, res);
      } else {
        return res.status(400).send({
          message: "Incorrect Email or password",
        });
      }
    }
  }

  async googleSignin(req, res) {
    try {
      const user = req.body.user;
      const { email, phone, title } = user;

      const isRegistered = await User.findOne({ $or: [{ email }, { phone }] });
      const role = isRegistered.role;
      if (isRegistered) {
        return createToken({ email, role, phone }, isRegistered._id, res);
      } else {
        const newUser = new User({
          email,
          phone,
          title,
          role,
        });
        await newUser.save();
        return createToken({ email, role, phone }, newUser._id, res);
      }
    } catch (err) {
      return res.status(400).send({
        message: "Failed to login",
      });
    }
  }

  async register(req, res) {
    try {
      const { email, password, title, phone, role } = req.body;

      const newUser = new User();

      newUser.title = title;
      newUser.email = email;
      newUser.phone = phone;
      newUser.password = password;
      newUser.role = role ? role : "user";
      newUser.setPassword(password);

      await User.create(newUser);
      return res.status(201).send({
        message: "User added successfully",
      });
    } catch (err) {
      return res.status(400).send({
        message: "Failed to add new User",
      });
    }
  }

  async logout(req, res) {
    try {
      await Token.deleteMany({ _userId: req.user.userId });
    } catch (error) {
      return res.status(400).send({
        message: "Error deleting token",
      });
    }
    res.status(200).send({ status: true });
  }

  async me(req, res) {
    if (req.token && req.user) {
      const user = await User.findById(req.user.userId);

      if (!user) return res.status(400).send({ error: "Not found" });

      const { id, email, role, phone, title } = user;

      return res.status(200).send({
        id,
        email,
        role,
        phone,
        title,
      });
    } else {
      return res.status(400).send({
        message: "No user found",
      });
    }
  }

  async getAll(req, res) {
    const users = await User.find().catch((err) =>
      res.status(400).send({ message: err.message })
    );
    const filtered = users
      // .filter((user) => user.role !== "admin")
      .map((user) => {
        return {
          id: user.id,
          title: user.title,
          role: user.role,
          email: user.email,
          phone: user.phone,
        };
      });
    return res.status(200).send({ users: filtered });
  }
}

export default new Controller();
