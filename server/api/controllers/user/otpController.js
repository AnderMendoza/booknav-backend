import crypto from "crypto";
import jwt from "jsonwebtoken";
import Token from "../../models/token";
import User from "../../models/user";
import { createToken } from "./createToken";

const smsKey = process.env.SMS_SECRET_KEY;
// const twilioNum = process.env.TWILIO_PHONE_NUMBER;
export const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

export class OtpController {
  otp(req, res) {
    const phone = req.body.phone;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const ttl = 2 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;

    // client.messages
    //   .create({
    //     body: `Your One Time Login Password For CFM is ${otp}`,
    //     from: twilioNum,
    //     to: phone,
    //   })
    //   .then((messages) => console.log(messages))
    //   .catch((err) => console.error(err));

    // res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
    console.log(otp);
    res.status(200).send({ phone, hash: fullHash }); // Use this way in Production
  }

  async verify(req, res) {
    const phone = req.body.phone;
    const hash = req.body.hash;
    const otp = req.body.otp;
    let [hashValue, expires] = hash.split(".");

    let now = Date.now();
    if (now > parseInt(expires)) {
      return res.status(504).send({ message: "Timeout. Please try again" });
    }
    let data = `${phone}.${otp}.${expires}`;
    let newCalculatedHash = crypto
      .createHmac("sha256", smsKey)
      .update(data)
      .digest("hex");
    if (newCalculatedHash === hashValue) {
      console.log("user confirmed");

      const user = await User.findOne({ phone });

      createToken({ phone, email: user.email, role: user.role }, user._id, res);
    } else {
      console.log("not authenticated");
      return res
        .status(400)
        .send({ verification: false, message: "Incorrect OTP" });
    }
  }

  async refresh(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res
        .status(403)
        .send({ message: "Refresh token not found, login again" });

    const refreshTokens = await Token.find();
    console.log({ refreshToken });
    if (!refreshTokens.find((rf) => rf.token === refreshToken))
      return res
        .status(403)
        .send({ message: "Refresh token blocked, login again" });

    jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
      if (!err) {
        const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
          expiresIn: "30m",
        });
        return res
          .status(200)
          .cookie("accessToken", accessToken, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: "strict",
            httpOnly: true,
          })
          .cookie("authSession", true, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: "strict",
          })
          .send({ previousSessionExpired: true, success: true });
      } else {
        return res.status(403).send({
          success: false,
          message: "Invalid refresh token",
        });
      }
    });
  }
}

export default new OtpController();
