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

  async register(req, res) {
    try {
      const { email, password, title, phone, role } = req.body;

      const newUser = new User();

      newUser.title = title;
      newUser.email = email;
      newUser.phone = phone;
      newUser.password = password;
      newUser.role = role ? role : "marketing";
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

  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    const user = await User.findOne({ $or: [{ email }, { phone }] }).catch(
      (err) => {
        console.log(err);
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
  async logout(req, res) {
    const token = await Token.findById(req.cookies.refreshTokenID).catch(
      (err) => err.message
    );

    await Token.deleteMany({ _userId: token._userId });

    res
      .clearCookie("refreshToken")
      .clearCookie("accessToken")
      .clearCookie("authSession")
      .clearCookie("refreshTokenID")
      .send("logout");
  }

  async me(req, res) {
    if (req.cookies.refreshTokenID) {
      const token = await Token.findById(req.cookies?.refreshTokenID)
        .populate("_userId")
        .catch((err) => res.status(400).send({ message: err.message }));

      if (token._userId) {
        const { _id, email, role, phone, title } = token._userId;
        return res.status(200).send({
          _id,
          email,
          role,
          phone,
          title,
        });
      }
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
