function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.accessToken) {
      return next();
    }
  }
  return res.redirect("/");
}

const attachTokens = async (req, res, next) => {
  try {
    console.log(req);
    const accessToken = req.headers.authorization || req.query.access_token;
    console.log("Token type: ", typeof(accessToken));
    console.log("From middleware: ", accessToken);
    req.accessToken = accessToken;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { ensureAuthenticated, attachTokens };
