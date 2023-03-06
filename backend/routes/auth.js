const express = require("express")
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const router = express.Router()

router.post("/createuser",
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Min 3 characters required').isLength({ min: 3 }),
    body('password', 'Too short').isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({ error: "Email already exists" });
            }

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            res.send(user);
        } catch (err) {
            console.log(err); 
            res.status(500).json({"error":"Some error occured"}); 
        }

    })

module.exports = router

