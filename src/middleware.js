function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.accessToken){
      return next();
    }
  }
  return res.redirect("/");
}

module.exports = ensureAuthenticated;