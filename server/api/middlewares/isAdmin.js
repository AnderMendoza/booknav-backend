import jsonwebtoken from "jsonwebtoken";

export default async function isAdmin(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (accessToken)
    jsonwebtoken.verify(
      accessToken,
      process.env.JWT_AUTH_TOKEN,
      async (err, payload) => {
        if (payload?.role) {
          if (payload.role === "admin" || payload.role === "manager") {
            next();
          }
        } else {
          console.log(err);
          return res.status(403).send({ message: "Not Allowed" });
        }
      }
    );
  else {
    return res.status(403).send({ message: "Not Allowed , Not token sent" });
  }
}
