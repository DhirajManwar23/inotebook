const express = require("express");
const route = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body,validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/auth/getuser". Login required
route.get('/fetchallnotes', fetchuser, async (req, res) => {
        // Access user ID correctly
        try {
            const notes = await Notes.find({ user: req.user.id }); // Use `user` as defined in your schema
           return res.json({notes});
        }  catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }

       
});


// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
route.post('/addnotes', fetchuser, [
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
            title, description, tag, user: req.user.id
        })

        const savenotes =  await note.save();
      return  res.json(savenotes);
    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: "An error occurred while saving the note." }); // Use return
    }

});

// ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required

route.put('/updatenote/:id', fetchuser, async  (req, res) => {

       
        const { title, description, tag } = req.body;
        const newNote = {};
    
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }
    
        try {
            // Find the note to be updated
            let note = await Notes.findById(req.params.id);
    
            if (!note) {
                return res.status(404).send("Note not found");
            }
            
            //find user user id in note collec. and also check log in userid for matching.
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed");
            }
    
            // Find the note by ID and update it
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            
            if (!note) {
                return res.status(404).send("Note not found after update attempt");
            }
    
            res.json({ note });
        } catch (error) {
            console.error("Error updating note:", error);
            return res.status(500).send("Internal Server Error");
        }
    


})

// ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required
route.delete('/deletenote/:id', fetchuser, async  (req, res) => {

        const { title, description, tag } = req.body;
        const newNote = {};
    
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }
    
        try {
            // Find the note to be updated
            let note = await Notes.findById(req.params.id);
    
            if (!note) {
                return res.status(404).send("Note not found");
            }
    
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed");
            }
    
            // Find the note by ID and update it
            note = await Notes.findByIdAndDelete(req.params.id, { $set: newNote }, { new: true });
            
            if (!note) {
                return res.status(404).send("Note not found after update attempt");
            }
    
            res.json({"success":"success" , note : note});
        } catch (error) {
            console.error("Error updating note:", error);
            return res.status(500).send("Internal Server Error");
        }
    


})


module.exports = route;