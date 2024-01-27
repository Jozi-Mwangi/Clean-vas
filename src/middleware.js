function ensureAuthenticated(res, req, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
}

module.exports = ensureAuthenticated;