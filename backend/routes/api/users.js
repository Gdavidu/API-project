const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
    check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required'),
  check('username')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
router.post(
  '/',
  validateSignup, async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;
    const oldUser = await User.unscoped().findOne({ where: { email: email } })
    if (oldUser) {
      const err = new Error("User already exists")
      err.status = 500;
      err.message = "User already exists"
      err.errors = { email: "User with that email already exists" };
      return next(err)
    }
    const oldUsername = await User.unscoped().findOne({ where: { username: username } })
    if (oldUsername) {
      const err = new Error("User already exists")
      err.status = 500;
      err.message = "User already exists"
      err.errors = { username: "User with that username already exists" };
      return next(err)
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });


    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;
