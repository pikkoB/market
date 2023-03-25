const { Router } = require("express");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

router.post("/api/v1/cart", authenticate, addToCart)

module.exports = router;