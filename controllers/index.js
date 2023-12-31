const router = require('express').Router();
const { User } = require('../models');

// GET the login page
router.get('/login', (req, res) => {

    if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// GET the registration page
router.get('/register', (req, res) => {

    if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

// POST a new user for registration
router.post('/register', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json({ user: userData, message: 'Login successful' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {

    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;