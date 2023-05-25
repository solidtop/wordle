import express from "express";
import { engine } from "express-handlebars";
import router from "./routers";
import Handlebars from "handlebars";
import session from "express-session";

export default function initApp() {
  const app = express();

  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");

  Handlebars.registerHelper("inc", (value: string) => {
    return parseInt(value) + 1;
  });

  Handlebars.registerHelper("formatTime", (time: number) => {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return date.getUTCHours() > 0
      ? `${hours}:${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
  });

  app.use(
    session({
      secret: "sectret-key",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(express.json());
  app.use(express.static("../client/dist"));
  app.use(router);

  return app;
}
