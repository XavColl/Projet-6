const validator = require('validator');

/** Checks if the email sent is in good format. */

module.exports.validateEmail = (req, res, next) => {
    const email = req.body.email;
    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: 'Invalid email format' });
    }
    next();
  }
  