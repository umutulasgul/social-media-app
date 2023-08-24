import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./utils/database/connectDatabase.js";
import routers from "./routers/index.js"

dotenv.config({ path: "./config/env/config.env" });

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api",routers);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
