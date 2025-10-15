const express = require("express");

const { chkSession, sessionLogout } = require("../Controllers/SessionController");

const sessionRouter = express.Router();

//// /SESSOIN/CHK
sessionRouter.post("/chk", chkSession);
sessionRouter.post("/logout", sessionLogout);

module.exports = { sessionRouter };