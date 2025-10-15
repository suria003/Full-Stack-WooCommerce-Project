const express = require("express");

const { chkSession } = require("../Controllers/Session");

const sessionRouter = express.Router();

//// /SESSOIN/CHK
sessionRouter.route("/chk", chkSession);

module.exports = { sessionRouter };