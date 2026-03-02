
import express from "express";
import cors from "cors";
import "dotenv/config";

import urlRoutes from "./routes/url.routes";
import urlController from "./controllers/url.controller";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/url", urlRoutes);
app.get("/:shortCode", urlController.redirectUrl);

export default app;