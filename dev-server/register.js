const fs = require('fs');
const fsPromise = fs.promises;
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
  const user = Object.assign({}, req.body);
  const password = user.password;

  bcrypt
    .hash(password, 10)
    .then(hashedPassword => {
      user.id = Math.floor(Math.random() * Math.floor(1000));
      user.hashedPassword = hashedPassword;
      delete user.password;

      fsPromise
        .readFile(__dirname + '/db.json', 'utf-8')
        .then(file => {
          let data = JSON.parse(file);
          data.users.push(user);
          return data;
        })
        .then(data => {
          return fsPromise.writeFile(__dirname + '/db.json', JSON.stringify(data, null, 2), {
            encoding: 'utf-8'
          });
        })
        .then(() => {
          res.json(user);
        });
    })
    .catch(err => {
      error(err);
    });
};
