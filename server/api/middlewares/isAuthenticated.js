import jsonwebtoken from "jsonwebtoken";

export default async function authenticateUser(req, res, next) {
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    jsonwebtoken.verify(
      accessToken,
      process.env.JWT_AUTH_TOKEN,
      async (err, data) => {
        if (data) {
          next();
        } else if (err.message === "TokenExpiredError") {
          return res.status(401).send({
            success: false,
            message: "Access token expired",
          });
        } else {
          console.log(err);
          return res
            .status(403)
            .send({ err, message: "User not authenticated" });
        }
      }
    );
  } else {
    return res.status(401).send({ message: "Not Allowed" });
  }
}
