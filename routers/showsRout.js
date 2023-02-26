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

//The Show Router should get shows of a specific genre using an endpoint.
// For example, /shows/genres/Comedy should return all shows with a genre of Comedy.
router.get("/genres/:idGenre", async (req, res) => {
  const show = await Show.findAll({ where: { genre: req.params.idGenre } });

  res.json(show);
});

// The Show Router should update the status on a specific show from “cancelled”
// to “on-going” or vice versa using an endpoint.
// For example, a PUT request with the endpoint /shows/3/updates should be able to
// update the 3rd show to “canceled” or “on-going”.

router.put("/:id/updates", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  const currentStatus = show["status"];
  let newStatus = "";
  if (currentStatus === "cancelled") {
    newStatus = "on-going";
  } else {
    newStatus = "cancelled";
  }
  show.update({
    status: newStatus,
  });
  res.json(
    `${show["title"]} was ${currentStatus} and is now ${show["status"]}!`
  );
});

// The Show Router should update a rating on a specific show using an endpoint.
// For example, a PUT request to /shows/4/watched would update the 4th show that has been watched.

router.put("/:id/:status", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  show.update({
    status: req.params.status,
  });
  res.json(`${show["title"]} is ${show["status"]}!`);
});

module.exports = router;
