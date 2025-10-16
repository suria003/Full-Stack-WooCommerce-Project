const express = require("express");

const { sessionChk, sessionLogout } = require("../Controllers/SessionController");

const sessionRouter = express.Router();

//// /SESSOIN/CHK
sessionRouter.get("/chk", sessionChk);
sessionRouter.post("/logout", sessionLogout);

module.exports = { sessionRouter };