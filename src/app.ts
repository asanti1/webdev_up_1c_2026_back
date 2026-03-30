import "reflect-metadata"
import express from 'express';

const app = express();

app.get("/health", (req, res) => {
    res.send("Healthy")
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

export default app;