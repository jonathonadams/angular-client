const fs = require('fs');
const bcrypt = require('bcryptjs');
const data = require('./db.json');

module.exports = (req, res, next) => {
  const user = Object.assign({}, req.body);
  const password = user.password;

  bcrypt
    .hash(password, 10)
    .then(hashedPassword => {
      user.id = Math.floor(Math.random() * Math.floor(1000));
      user.hashedPassword = hashedPassword;
      delete user.password;
      data.users.push(user);
      fs.writeFile(__dirname + '/api/db.json', JSON.stringify(data, null, 2), 'utf8', () => {
        res.json(user);
      });
    })
    .catch(err => {
      error(err);
    });
};
