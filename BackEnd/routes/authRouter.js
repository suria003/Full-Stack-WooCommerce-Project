const express = require("express");

const { loginAccessController } = require("../Controllers/loginAccessController");
const { registerAccessController } = require("../Controllers/registerAccessController");

const authenRouter = express.Router();

authenRouter.post("/register", registerAccessController);
authenRouter.post("/login", loginAccessController);

module.exports = { authenRouter };