import express from "express";
import { getActiveMenu, getMainNav } from "../utils/menus";

const router = express.Router();
router.get("/about", (req, res) => {
  res.render("about", {
    menu: getActiveMenu(getMainNav(), "/about"),
  });
});

export default router;
