// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");
const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
  Users.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user with the specified ID does not exist",
        err: err.message,
        stack: err.stack,
      });
    });
});
server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(404).json({
        message: "error getting user",
        err: err.message,
        stack: err.stack,
      });
    });
});

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  } else {
    Users.insert(user)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      const deletedUser = await Users.remove(user.id);
      res.status(200).json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
      err: err.message,
      stack: err.stack,
    });
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      if (!req.body.name || !req.body.bio) {
        res.status(400).json({
          message: "Please provide name and bio for the user",
        });
      } else {
        const updateUser = await Users.update(req.params.id, req.body);
        res.status(200).json(updateUser);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be modified",
      err: err.message,
      stack: err.stack,
    });
  }
});

server.use("*", (req, res) => {
  res.status(404).json({
    message: "oooops",
  });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
