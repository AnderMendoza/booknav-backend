import jsonwebtoken from "jsonwebtoken";

export default async function isAdmin(req, res, next) {
  const accessToken = req.token;

  if (accessToken)
    jsonwebtoken.verify(
      accessToken,
      process.env.JWT_AUTH_TOKEN,
      async (err, payload) => {
        if (payload?.data?.role) {
          const role = payload.data.role;

          if (role === "admin" || role === "manager") {
            next();
          }
        } else {
          return res.status(403).send({ message: "Not Allowed" });
        }
      }
    );
  else {
    return res.status(403).send({ message: "Not Allowed , Not token sent" });
  }
}
