var jwt = require('jsonwebtoken');
const key = 'kibflifb';

module.exports = function sign(username) {

    const  token = jwt.sign({ username: username }, key, { expiresIn: '12h' });
    return token;

};