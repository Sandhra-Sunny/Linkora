import express from "express";
const router = express.Router();

import urlController from "../controllers/url.controller";

router.post("/shorten", urlController.createShortUrl);
// router.get("/:shortCode", redirectUrl);

export default router;