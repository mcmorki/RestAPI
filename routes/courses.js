const express = require('express');
const router = express.Router();
const dbModule = require('../db');
const models = dbModule.models;
const { Course, User } = models;

//R E T U R N S    A L L   C O U R S E S
// router.get('/', (req, res) => {
//   Course.findAll({
//     include : [
//       {
//         model : User,
//         as: 'User',
//         attributes: ['id', 'firstName', 'lastName']
//       }
//     ]
//   }).then((course) => {
//     res.json(course);
//   });
// });
//SIMPLIFIED
router.get('/', async(req, res) => {
  try{
const course = await Course.findAll({
  include : [
    {
      model : User,
      as: 'User',
      attributes: ['id', 'firstName', 'lastName']
    }
  ]
})
res.json(course);
  } catch{
    res.sendStatus(500);
  }});
//-------------------------------------------------------------------------------------------------------------


//L O C A T E S    C O U R S E   B Y   I D
// router.get('/:id', (req, res, next) => {
//   Course.findByPk(req.params.id, {
//     include : [
//       {
//         model : User,
//         as: 'User',
//         attributes: ['id', 'firstName', 'lastName']
//       }
//     ]
//   })
//     .then((course) => {
//       if (course) {
//         res.json(course);
//       } else {
//         res.status(404).json({message: "Course not found"});
//       }
//     }).catch((err) => {
//       return next(err);
//     })
// })
//SIMPLIFIED
router.get('/:id', async(req, res, next) => {
  try{
  const course = await Course.findByPk(req.params.id, {
    include : [
      {
        model : User,
        as: 'User',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  }) 
  if (course) {
        res.json(course);
      } else {
        res.status(404).json({message: "Course not found"});
      }
  }catch(err){
      return next(err);
    }
})
//-------------------------------------------------------------------------------------------------------------
//C R E A T E S    A    C O U R S E
// router.post('/', (req, res, next) => {
//   const course = req.body
//   Course.create(course)
//     .then((data) => {
//       res.location(`/api/courses/${data.id}`);
//       res.status(201).end()
//     }).catch((err) => {
//       err.status = 400;
//       return next(err);
//   }) 
// });
//SIMPLIFIED
router.post('/', async(req, res, next) => {
  try{
    const course = req.body
    const data = await Course.create(course)
      res.location(`/api/courses/${data.id}`);
      res.status(201).end()
  }catch(err){
      err.status = 400;
      return next(err);
  } 
});
//-------------------------------------------------------------------------------------------------------------

// U P D A T E S    A    C O U R S E 
// router.put('/:id',(req, res, next) => {
//   Course.findByPk(req.params.id)
//     .then((course) => {
//       if (course) {
//         return course.update(req.body)
//       } else {
//         res.status(404).json({message: "Course not found"});
//       }
//   }).then(() => {
//     res.status(204).end()
//   }).catch((err) => {
//     if (err.name === "SequelizeValidationError") {
//       res.status(400).json({error: err.message})
//     } else {
//       throw err;
//     }
//   })
//   .catch((err) => {
//     return next(err);
//   }) 
// })

//SIMPLIFIED
router.put('/:id',async(req, res, next) => {
  try{
    //never retun before functionality is over 
  const course = await Course.findByPk(req.params.id)
      if (course) {
         await course.update(req.body)
      } else {
        res.status(404).json({message: "Course not found"});
      }
  res.status(204).end()
} catch(err){
    if (err.name === "SequelizeValidationError") {
      res.status(400).json({error: err.message})
    } else {
      return next(err);
    }
  }
})
//----------------------------------------------------------------------------------------------------------

//D E L E T E S    A     C O U R S E
// router.delete('/:id',  (req, res, next) => {
//   Course.findByPk(req.params.id)
//     .then((course) => {
//       if (course) {
//         return course.destroy();
//       } else {
//         res.status(404).json({message: "Course not found"});
//       }
//     }).then(() => {
//       res.status(204).end()
//     }).catch((err) => {
//       return next(err);
//     })
// })

//SIMPLIFIED
router.delete('/:id',  async(req, res, next) => {
  try{
 const course =  await Course.findByPk(req.params.id)
      if (course) {
        await course.destroy();
      } else {
        res.status(404).json({message: "Course not found"});
      }
    res.status(204).end()
 }catch(err){
      return next(err);
    }
})

module.exports = router