import "reflect-metadata"
import express from 'express';
import { initDB } from "./database";

const app = express();
app.use(express.json());



async function bootstrap() {
  try {
    await initDB();

    app.listen(3000, () => {
      console.log("Example app listening on port 3000");
    });
  } catch (error) {
    console.error("Init DB err", error);
    process.exit(1);
  }
}

bootstrap();

app.get("/health", (_req, res) => {
  res.send("Healthy");
});

export default app;