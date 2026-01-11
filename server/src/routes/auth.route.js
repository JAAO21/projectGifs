const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth/auth.controller");

router.post("/signIn", auth.SignIn);
router.post("/signUp", auth.SignUp);

module.exports = router;
