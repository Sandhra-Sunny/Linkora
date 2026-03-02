import { Request, Response } from "express";
const prisma = require("../config/prisma");
const { nanoid } = require("nanoid");

// Create Short URL
const urlController = {

  createShortUrl: async (req: Request, res: Response) => {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const shortCode = nanoid(6);

      const newUrl = await prisma.url.create({
        data: {
          originalUrl: url,
          shortCode,
        },
      });

      res.json({
        shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Redirect
  redirectUrl: async (req: Request, res: Response) => {
    try {
      const { shortCode } = req.params;

      const record = await prisma.url.findUnique({
        where: { shortCode },
        select: { originalUrl: true },
      });

      if (!record) {
        return res.status(404).json({ error: "Not found" });
      }

      // no need to await here it can run asynchronously redirection priority
      prisma.url.update({
        where: { shortCode },
        data: { clicks: { increment: 1 } },
      }).then(() => {
        console.log("Updated click counter");
      }).catch((error: Error) => {
        console.error("Error with updating count", error);
      });

      res.redirect(record.originalUrl);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default urlController;