const express =require("express");
const route = express.Router();
const User = require("../models/User");
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fethcuser = require('../middleware/fetchuser')

const JWT_SECRET = 'SecretKey@123';

route.get('/CreateUser', 
    body('name', "Enter a valid name").isLength({ min: 6 }),
    body('email', "Enter a valid email").isEmail().exists().withMessage('username must be exist'),
    body('password', "Enter a valid password with minimum 5 charchter").isLength({ min: 6 })
  , async (req, res) => {
  
    // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check whether the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }
            // Create a new user

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            })
            data={
                user:{
                    id: user.id
                  }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({authtoken})
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }

    }
);

route.get('/Login', 
    body('email', "Enter a valid email").isEmail().exists().withMessage('username must be exist'),
    body('password', "Password cannot be blank").exists()
  , async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
          }

          const passwordmatch = await bcrypt.compare(password, user.password)
          if(!passwordmatch){
            return res.status(400).json({error: "Please try to login with correct credentials"});
          }

          data={
            user:{
                id: user.id
              }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }


});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
route.post('/getuser', fethcuser,  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })



module.exports =route;