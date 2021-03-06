var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/charityinfo';
var db = pgp(connectionString);

function addCharityLike(req, res, next) {

    db.any('INSERT INTO user_history (USERID, create_time, charity_name, WebURL)' +
           'VALUES ( ${user_id}, now(), ${charityName}, ${URL} )', {
      user_id: req.body.user_id,
      charityName: req.body.charityName,
      URL: req.body.URL
    })
    .then(data => {
      res.status(200)
         .json(data);
    })
    .catch(err => console.log(err));
}

function addNewUser(req, res, next) {

    db.any('INSERT INTO users (USERID)' +
    'VALUES (${user_id})' + 
    'ON CONFLICT (USERID) DO NOTHING', {
        user_id: req.params.user_id
    })
    .then(data => {
      res.status(200)
         .json(data);
    })
    .catch(err => {
        console.log(err)
        return next(err)
    });
}

module.exports = {
    addCharityLike,
    addNewUser
}