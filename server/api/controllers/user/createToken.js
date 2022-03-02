import jwt from "jsonwebtoken";
import Token from "../../models/token";
import { JWT_AUTH_TOKEN, JWT_REFRESH_TOKEN } from "./controller";

export const createToken = async (payload, userId, res) => {
  payload.userId = userId;
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

    await Token.create(refreshToken);

    return res.status(201).send({
      accessToken,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error creating token",
    });
  }
};
