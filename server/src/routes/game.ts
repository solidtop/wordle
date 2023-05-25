import express from "express";
import { getActiveMenu, getMainNav } from "../utils/menus";

const router = express.Router();
router.get("/", (req, res) => {
  res.render("game", {
    menu: getActiveMenu(getMainNav(), "/"),
  });
});

export default router;
