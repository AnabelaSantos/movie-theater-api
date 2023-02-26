const express = require("express"); //import the express module ()
const app = express(); //create an express application
const { sequelize } = require("./db");
const { db } = require("./db");

const port = 3000;
app.use(express.json());

const userRouter = require("./routes/usersRout.js");

app.use("/users", userRouter);

const showRouter = require("./routes/showsRout.js");

app.use("/shows", showRouter);

// This final block starts up the server on a specified port ('3000') and prints a log comment to the console.
//create server to listen on port 3000
const server = app.listen(port, function () {
  // the listen() method listens for connections on the host and the port number
  console.log(`Node server is running on http://localhost:${port}..`);
});
