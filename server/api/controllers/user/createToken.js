import jwt from "jsonwebtoken";
import Token from "../../models/token";
import { JWT_AUTH_TOKEN, JWT_REFRESH_TOKEN } from "./controller";

export const createToken = async (payload, userId, res) => {
  const accessToken = jwt.sign(payload, JWT_AUTH_TOKEN, {
    expiresIn: "15m",
  });
  const token = jwt.sign(payload, JWT_REFRESH_TOKEN, {
    expiresIn: "30d",
  });

  try {
    const refreshToken = new Token();
    refreshToken.token = token;
    refreshToken._userId = userId;

    const newTokenDb = await Token.create(refreshToken);

    return res
      .status(201)
      .cookie("accessToken", accessToken, {
        expires: new Date(new Date().getTime() + 15 * 1000 * 60), // 15 minutes
        sameSite: "strict",
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken.token, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 30), // 1 day
        sameSite: "strict",
        httpOnly: true,
      })
      .cookie("authSession", true, {
        expires: new Date(new Date().getTime() + 15 * 1000 * 60),
        sameSite: "strict",
      })
      .cookie("refreshTokenID", newTokenDb.id, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 30),
        sameSite: "strict",
      })
      .send({ message: "Device verified" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error creating token",
    });
  }
};
