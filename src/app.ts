import express from 'express';
import passport from "passport";
import "reflect-metadata";
import "./config/jwtStrategy.config";
import { initDB } from "./database";
import { errorMiddleware } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import categoryPackageRoutes from './routes/categoryPackage.routes';
import destinationRoutes from './routes/destination.routes';
import packageRoutes from "./routes/package.routes";
import reservationRoutes from './routes/reservation.routes';
import userRoutes from "./routes/user.routes";
import countryRoutes from './routes/country.routes';

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

const app = express();
app.use(express.json());

app.use(passport.initialize());

app.get("/health", (_req, res) => {
  res.send("Healthy");
});


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/packages", packageRoutes);
app.use("/reservations", reservationRoutes);
app.use("/destinations", destinationRoutes);
app.use("/categoryPackages", categoryPackageRoutes);
app.use("/countries", countryRoutes);




app.use(errorMiddleware)

const PORT = Number(process.env.PORT) || 3000;
async function bootstrap() {
  try {
    await initDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Init DB err", error);
    process.exit(1);
  }
}



bootstrap();


export default app;