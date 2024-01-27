const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/auth/genius", passport.authenticate("genius"));
router.get(
  "/auth/genius/callback",
  passport.authenticate("genius", { failureRedirect: "/" }),
  (res, req) => {
    res.redirect("/")
  }
);
