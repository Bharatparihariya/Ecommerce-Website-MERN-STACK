import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authroutes from "./routes/AuthRoute.js";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import path from "path";
import {fileURLToPath} from "url";
dotenv.config();

connectDb();

//EsModule Fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan(`Dev`));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authroutes);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/product", ProductRoute);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.Dev} mode on ${PORT}`.bgCyan.white
  );
});
