const express = require("express");
const {
    handlelogin,
    handlelogout,
    handleRegister,
} = require("../controllers/authControllers.js");
const userAuth = require("../middlewares/userAuth.js");

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handlelogin);
router.post("/logout", handlelogout);

module.exports = router;
