import examplesRouter from "./api/controllers/examples/router";
import userRouter from "./api/controllers/user/router";
import doctorRouter from "./api/controllers/doctor/router";

export default function routes(app) {
  app.use("/api/v1/examples", examplesRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/doctor", doctorRouter);
}
