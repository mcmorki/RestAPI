
const express = require('express');
const router = express.Router();
const dbModule = require('../db');
const models = dbModule.models;
const bcryptjs = require('bcryptjs');

const authenticateUser = require('../authenticate');

const { User } = models;


 //R E T U R N S   O N L Y  T H E   C U R R E N T   A U T H E N T I C A T E D   U S E R
 //Rescources used https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
router.get('/', authenticateUser, async (req, res) => {
  const user = await users;
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    })
});

//RETURNS AN ERROR IF AUTHENTICATED CREDENTIALS ARE NOT MET
router.post('/', async(req, res, next) => {
  try{
    const user = await User.create(req.body)
     if (bcryptjs.hashSync(user.password)) {
  }else{
     res.location('/');
    res.status(201).end()
  }
} catch(err){
    if (err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
      res.status(400).json({error: err.message})
    } else {
      return next(err);
    }
  }
})
  
module.exports = router