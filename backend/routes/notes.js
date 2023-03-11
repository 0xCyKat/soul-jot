const express = require("express")
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const router = express.Router()

// ROUTE 1: Fetch All the notes
router.get("/fetchAllNotes", fetchUser,
    async (req, res) => {
        try {
            const notes = await Note.find({ user: req.user.id });
            res.json(notes);
        } catch (err) {
            console.log(err);
            res.status(500).json({ "error": "Internal error occured" });
        }
    })

// ROUTE 2: Endpoint for adding notes : Login Required
router.post('/addNote', fetchUser,
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            let note = await Note.create({
                title: req.body.title,
                description: req.body.description,
                user: req.user.id
            });

            const savedNote = await note.save();
            res.send(savedNote);
        } catch (err) {
            console.log(err);
            res.status(500).json({ "error": "Internal error occured" });
        }
    })


// ROUTE 3: Endpoint for updating notes 
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const { title, description } = req.body;

    try {

        // create newNote object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }

        // find note and update it
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ "error": "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ "error": "Access Denied" });
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ "error": "Internal error occured 22 " });
    }
})

// ROUTE 4: Endpoint for deleting notes 
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

    try {
        // finding and deleting note
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ "error": "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ "error": "Access Denied" });
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.send("note deleted");
    } catch (err) {
        console.log(err);
        res.status(500).json({ "error": "Internal error occured" });
    }
})
module.exports = router; 