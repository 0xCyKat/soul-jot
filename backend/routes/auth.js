const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const JWT_SECRET = "confidential"; 

// creating a user when a POST request to /auth/createuser is sent. 
router.post("/createuser", 

    // basic checks using express validator 
    
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Min 3 characters required').isLength({ min: 3 }),
    body('password', 'Too short').isLength({ min: 5 }),
    async (req, res) => {

        // if there are any errors it returns if not then it will create the user
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            let user = await User.findOne({ email: req.body.email });

            // checking if duplicate user exists

            if (user) {
                return res.status(400).json({ error: "Email already exists" });
            }

            let salt = await bcrypt.genSalt(10); 
            let securedPass = await bcrypt.hash(req.body.password,salt); 

            // storing user creds in database
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securedPass,
            });

            const data = {
                user:{
                    id:user.id
                }
            } 

            const authToken = jwt.sign(data,JWT_SECRET); 
            res.json({authToken}); 

        } catch (err) {
            console.log(err); 
            res.status(500).json({"error":"Some error occured"}); 
        }

    })

module.exports = router

