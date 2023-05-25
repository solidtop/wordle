import express from "express";
import { getActiveMenu, getMainNav, getDropdownFilter } from "../utils/menus";
import Highscore from "../models/highscore";
import { connectDb } from "../utils/connectDb";

const router = express.Router();

router.get("/highscores", async (req, res) => {
  const wordLength =
    parseInt(req.query.wordLength as string) ||
    req.session.settings?.wordLength ||
    5;
  const uniqueLetters = req.query.uniqueLetters
    ? req.query.uniqueLetters === "true"
    : req.session.settings?.uniqueLetters || false;

  try {
    await connectDb();
    const highscores = await Highscore.find({
      settings: {
        wordLength,
        uniqueLetters,
      },
    })
      .sort({ score: -1 })
      .limit(10);

    res.render("highscores", {
      menu: getActiveMenu(getMainNav(), `/highscores`),
      highscores: highscores.map((highscore) => highscore.toObject()),
      dropdown: {
        active: wordLength,
        items: getDropdownFilter(uniqueLetters),
      },
      checkbox: {
        checked: uniqueLetters,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
