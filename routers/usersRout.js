const express = require("express");
const { body, check, validationResult } = require("express-validator");
const router = express.Router();

const { User, Show } = require("../models/index"); //import the User model
router.use(express.json());

// The User Router should GET ALL users from the database using the endpoint /users.
router.get("/", async (req, res) => {
  const user = await User.findAll();
  res.json(user);
});

// The User Router should GET one user from the database using an endpoint.
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

//The User Router should GET all the shows watched by a user using an endpoint.
// For example, /users/2/shows should return all the shows for the 2nd user.

router.get("/:id/shows", async (req, res) => {
  let user = await User.findByPk(req.params.id);
  let shows = await user.getShows();
  res.json(shows);
});

// The User Router should update and add a show if a user has watched it using an endpoint.
// For example, a PUT request to  /users/2/shows/9 should update the 9th show for the 2nd user.

router.put("/:id/shows/:idShows", async (req, res, next) => {
  //next() can be used to pass control to the next handler
  const user = await User.findByPk(req.params.id);
  const show = await Show.findByPk(req.params.idShows);
  await user.addShow(show);
  res.json(`${show["title"]} was watched by ${user["username"]}!`);
});

module.exports = router;
