const express =require("express");
const route = express.Router();
const User = require("../models/User");
const { body,validationResult } = require('express-validator')

route.get('/', 
    body('name', "Enter a valid name").isLength({ min: 6 }),
    body('email', "Enter a valid email").isEmail().exists().withMessage('username must be exist'),
    body('password', "Enter a valid password with minimum 5 charchter").isLength({ min: 6 })
  , async (req, res) => {
        const user = User(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json(user);
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);


module.exports =route;