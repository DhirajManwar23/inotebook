const express = require("express");
const route = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body,validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/auth/getuser". Login required
route.get('/fetchallnotes', fetchuser, async (req, res) => {
        // Access user ID correctly
        try {
            const notes = await Notes.find({ user: req.user._id }); // Use `user` as defined in your schema
            res.json(notes);
        }  catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }

       
});


// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
route.get('/addnotes', fetchuser, [
    body('title', "Enter a valid Tittle").isLength({ min: 3 }),
    body('description', "Enter a valid description").isLength({ min: 3 }),
], async (req, res) => {
    try {
       
        const{ title, description, tag } = req.body;
        const errors = validationResult(req);   
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

           // Create a new note and store the user ID
        const note = new Notes({
            title, description, tag, user: req.user._id
        })

      
        //  const note = new Notes({
        //     title,
        //     description,
        //     tag,
        //     user: req.user._id // Assuming fetchuser middleware sets req.user
        // });

        const savenotes =  await note.save();
      return  res.json(savenotes);
    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: "An error occurred while saving the note." }); // Use return
    }

});

module.exports = route;