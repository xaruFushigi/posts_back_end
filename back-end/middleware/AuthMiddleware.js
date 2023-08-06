const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.status(405).json({ error: "Log in to make comments" });
  } else {
    try {
      if (accessToken !== "null") {
        const validToken = verify(accessToken, "secret");
        req.user = validToken;
        if (validToken) {
          return next();
        }
      } else {
        return res.status(405).json({ error: "Log in to make comments" });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
  // verifies jsonwebtoken
};

module.exports = { validateToken };
