import userRouter from "./api/controllers/user/router";

export default function routes(app) {
  app.use("/api/v1/user", userRouter);
}
