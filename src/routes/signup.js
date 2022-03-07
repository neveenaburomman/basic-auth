'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Users}=require('../models/index.js');

router.post('/signup',signupFunc);


async function signupFunc(req, res) {
    let { username, password } = req.body;

    console.log(`${username} =>> ${password}`);

    try {
        let hashedPassword = await bcrypt.hash(password, 5);

        console.log( hashedPassword)
        
        const newUser = await Users.create({
            username: username,
            password: hashedPassword
        })
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
    }
}
module.exports = router;
