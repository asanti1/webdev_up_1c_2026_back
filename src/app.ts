import "reflect-metadata"
import express from 'express';
import { initDB } from "./database";
import passport from "passport";
import "./config/jwtStrategy.config";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use(passport.initialize())
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use(errorMiddleware)

app.get("/health", (_req, res) => {
  res.send("Healthy");
});

const PORT = Number(process.env.PORT) || 3000;



async function bootstrap() {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Init DB err", error);
    process.exit(1);
  }
}



bootstrap();


export default app;