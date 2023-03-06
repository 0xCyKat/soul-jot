const express = require("express") 
const User = require("../models/User") 
const { body, validationResult } = require('express-validator') 
const router = express.Router()

router.post("/",
body('email','Enter a valid Email').isEmail(),
body('name','Min 3 characters required').isLength({min:3}), 
body('password','Too short').isLength({min:5}), 
(req,res)=>{ 

    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    User.create({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error:"Email Already exists"})});

})

module.exports = router

