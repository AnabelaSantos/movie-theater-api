const express = require("express");
const { body, check, validationResult } = require("express-validator");
const router = express.Router();

const { Show } = require("../models/index"); //import the User model
router.use(express.json());

// The Show Router should GET ALL shows from the database using the endpoint /shows.
router.get("/", async (req, res) => {
  const show = await Show.findAll();
  res.json(show);
});

// The Show Router should GET one show from the database using an endpoint.
router.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  res.json(show);
});

module.exports = router;
