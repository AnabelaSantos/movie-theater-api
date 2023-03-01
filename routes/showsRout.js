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

// The Show Router should update a rating on a specific show using an endpoint.
// For example, a PUT request to /shows/4/watched would update the 4th show that has been watched.

router.put(
  "/:id/watched",
  [check("rating").isNumeric()],

  async (req, res) => {
    const errors = validationResult(req);
    // If the validationResults returns any errors, then trigger a response
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const show = await Show.findByPk(req.params.id);
      show.update({
        rating: req.body.rating,
      });
      res.json(`${show["title"]} was rated ${show["rating"]}!`);
    }
  }
);

// The Show Router should update the status on a specific show from “cancelled”
// to “on-going” or vice versa using an endpoint.
// For example, a PUT request with the endpoint /shows/3/updates should be able to
// update the 3rd show to “canceled” or “on-going”.

router.put(
  "/:id/updates",
  [
    check("status").trim().not().isEmpty(),
    check("status").isLength({ min: 5, max: 25 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If the validationResults returns any errors, then trigger a response
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const show = await Show.findByPk(req.params.id);
      const currentStatus = show["status"];

      show.update({
        status: req.body.status,
      });
      res.json(
        `${show["title"]} was ${currentStatus} and is now ${show["status"]}!`
      );
    }
  }
);

// The Show Router should be able to delete a show.

router.delete("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  show.destroy();
  res.json(`${show["title"]} was deleted!`);
});

module.exports = router;
