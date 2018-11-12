'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const data = require('./db.json');

// This will return a JWT regardles of usernam or password.
// Only for testing
module.exports = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(401).send('None shall pass !!!!!');
  } else {
    const user = data.users.find(user => {
      return user.username === username;
    });

    if (user) {
      // user has been found
      // See if passwords match
      bcrypt
        .compare(password, user.hashedPassword)
        .then(result => {
          if (result === true) {
            // sign a token and send it on its way
            const token = jwt.sign(
              {
                sub: user.id
              },
              'secret',
              {
                expiresIn: 86400
              }
            );

            // send the user and JWT back
            res.json({
              user: user,
              token: token
            });
          } else {
            res.status(401).send('None shall pass !!!!!');
          }
        })
        .catch(err => {
          // res.status(401).send('None shall pass !!!!!');
        });
    } else {
      res.status(401).send('None shall pass !!!!!');
    }
  }
};
