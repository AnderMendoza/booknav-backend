import jsonwebtoken from "jsonwebtoken";

export default async function authenticateUser(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (
    typeof bearerHeader !== "string" ||
    !bearerHeader?.split(" ")?.[1] ||
    bearerHeader === undefined
  ) {
    return res.status(403).send({ message: "Not Allowed" });
  }
  const bearer = bearerHeader?.split(" ");
  const bearerToken = bearer[1];

  req.token = bearerToken;
  const accessToken = bearerToken;

  if (accessToken) {
    jsonwebtoken.verify(
      accessToken,
      process.env.JWT_AUTH_TOKEN,
      async (err, payload) => {
        if (payload) {
          req.user = payload.data;
          next();
        } else if (err.message === "TokenExpiredError") {
          return res.status(401).send({
            success: false,
            message: "Access token expired",
          });
        } else {
          return res
            .status(403)
            .send({ err, message: "User not authenticated" });
        }
      }
    );
  } else {
    return res.status(403).send({ message: "Not Allowed" });
  }
}
