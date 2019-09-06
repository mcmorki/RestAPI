const express = require('express');
const dbModule = require('./db')
const models = dbModule.models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const { User } = models;

// U S E R   A U T H E N T I C A T I O N   M I D D L E W A R E 
const authenticateUser = (req, res, next ) => {

    const credentials = auth(req);
  
    if (credentials) {

      User.findOne({
          where : {
            emailAddress : credentials.name
          }
        }).then(user => {
          if (user) {
            if ( bcryptjs.compareSync(credentials.pass, user.password)) {
              console.log(`Authentication successful for user with email Address: ${user.emailAddress}`);
               users = user;
               next();
            } else {
              console.log(`Authentication failure for user with email Address: ${user.emailAddress}`);
              res.status(401).json({ message: 'Access Denied' });
            } 
          } else {
            console.log( `User not found with email Address: ${credentials.name}`);
            res.status(401).json({ message: 'Access Denied' });
          }   
        })
      } else {
        console.log('Auth header not found');
        res.status(401).json({ message: 'Access Denied' });
      }
  }

 module.exports = authenticateUser



  