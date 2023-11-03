// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require( './users/model' );
const server = express();
server.use(express.json());

server.get('/api/users', (req, res)=>{
    Users.find()
        .then(user=>{
            res.status(200).json(user);
        })
        .catch(err =>{
            res.status(500).json({
                message: "The users information could not be retrieved",
                err: err.message,
            })
        })
})



server.use("*", (req, res) => {
  res.status(404).json({
    message: "oooops",
  });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
