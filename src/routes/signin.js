
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {Users}=require('../models/index.js');
const router = express.Router();

router.post('/signin',signinFunc);

async function signinFunc(req,res) {

    if(req.headers['authorization']) {

        let basicHeaderParts= req.headers.authorization.split(' ');

        console.log(basicHeaderParts);

        let encodedPart = basicHeaderParts.pop(); //encoded(username:password)
          console.log(encodedPart);
          
        let decoded = base64.decode(encodedPart); //username:password
        console.log(decoded);

        let [username,password]= decoded.split(':'); //[username: password]
        // console.log('username');
        try {
            const user = await Users.findOne({where:{username:username}});
            const valid = await bcrypt.compare(password,user.password);
            if(valid) {
                res.status(200).json({username:username})
            } else {
                res.send('user is not valid')
            }
        } catch(error) {
            res.send(error)
        }
    }
}

module.exports = router;