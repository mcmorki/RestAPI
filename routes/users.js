const express = require('express');
const router = express.Router();
const dbModule = require('../db');
const models = dbModule.models;
const { Course, User } = models;

//R E T U R N S    A L L   U S E R S 
// router.get('/', (req, res) => {
//   User.findAll({
   
//   }).then((user) => {
//     res.json(user);
//   });
// });

//SIMPLIFIED 
router.get('/', async (req, res) => {
  try {
    const user = await User.findAll()
    res.json(user);
  } catch(err){
    res.sendStatus(500);
  }
 });
 //------------------------------------------------------------------------------------------------

//C R E A T E S    A    U S E R
// router.post('/', (req, res, next) => {
  
//   const user = req.body
//   User.create(user)
//     .then((data) => {
//       res.location(`/api//${data.id}`);
//       res.status(201).end()
//     }).catch((err) => {
//       err.status = 400;
//       return next(err);
//   }) 

// });
//SIMPLIFIED
router.post('/',async (req, res, next) => {
  try{
    const data = await User.create(req.body)
      res.location(`/api//${data.id}`);
      res.status(201).end()
  }catch(err){
      err.status = 400;
      return next(err); 
  }
});
 
module.exports = router