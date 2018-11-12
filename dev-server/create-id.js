'use strict';
// A middleware function to create an id field on the body object before it is saved in the db.json
module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = Math.floor(Math.random() * Math.floor(1000));
  }
  next();
};
