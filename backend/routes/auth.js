const express =require("express");
const route = express.Router();
const User = require("../models/User");

route.get('/', (req, res) => {
 console.log(req.body)
 const user = User(req.body);
 user.save();
 res.send(req.body);
})

module.exports =route;