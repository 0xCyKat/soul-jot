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
        } catch(err){
            console.log(err);
            res.status(500).json({ "error": "Internal error occured"});
        }
    })

// ROUTE 2: endpoint for adding notes : Login Required
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
        } catch(err){
            console.log(err);
            res.status(500).json({ "error": "Internal error occured"});
        }
    })
module.exports = router; 