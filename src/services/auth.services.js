const jwt = require("jsonwebtoken");

class AuthServices {
  static genToken(payload) {
    try {
      const token = jwt.sign(payload, "marketplace", {
        algorithm: "HS512",
        expiresIn: "1d",
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;
