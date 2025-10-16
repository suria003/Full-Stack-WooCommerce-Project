const express = require("express");

const segmentsRouter = express.Router();

const { EvaluateController } = require("../Controllers/EvaluateController");

segmentsRouter.post("/evaluate", EvaluateController);

module.exports = { segmentsRouter };