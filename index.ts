import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { environment } from "./environment";
const fs = require("fs");
const { http, https } = require("follow-redirects");

const crypto = require("crypto");

const app = express();
const PORT = environment.port;
const validExtensions = environment.validMediaFormats;

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  if(req.query?.link) {
    const link = req.query.link as string
    try {

    } catch (error) {
      res.sendStatus(500);
      console.log({
        link: link,
        error: error
      })
    }
    
  } else {
    res.sendStatus(404);
  }

})

// TODO improve this. This is a copy of github.com/gabboman/fediversemediacacher. Some comments no longer apply
app.get("/media", async (req: Request, res: Response) => {
  if (req.query?.media) {
    try {
      const mediaLink: string = req.query.media as string;
      const mediaLinkArray = mediaLink.split(".");
      let linkExtension =
        mediaLinkArray[mediaLinkArray.length - 1].toLowerCase();
      // calckey images have no extension
      if (validExtensions.indexOf(linkExtension) === -1) {
        linkExtension = "";
      }
      const mediaLinkHash = crypto
        .createHash("sha256")
        .update(mediaLink)
        .digest("hex");
      const localFileName = linkExtension
        ? `cache/${mediaLinkHash}.${linkExtension}`
        : `cache/${mediaLinkHash}`;
      if (fs.existsSync(localFileName)) {
        // We have the image! we just serve it
        res.set("Cache-control", "public, max-age=36000");
        res.sendFile(localFileName, { root: "." });
      } else {
        // its downloading time!
        try {
          const remoteResponse = await axios.get(mediaLink, {
            responseType: "stream",
            headers: { "User-Agent": "solution5-cache-link-preview" },
          });
          const path = `${__dirname}/${localFileName}`;
          const filePath = fs.createWriteStream(path);
          filePath.on("finish", () => {
            filePath.close();
            res.set("Cache-control", "public, max-age=36000");
            res.sendFile(localFileName, { root: "." });
          });
          remoteResponse.data.pipe(filePath);
        } catch (error) {
          console.log(error);
          res.sendStatus(404);
        }
      }
    } catch (error) {
      res.sendStatus(500);
      res.send();
      console.log(error);
    }
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`⚡️Server is running at https://localhost:${PORT}`);
});