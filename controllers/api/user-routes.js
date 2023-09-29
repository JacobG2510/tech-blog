const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// UPDATE user data by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedUser[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    res.status(200).json({ message: 'User data updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET user information by ID
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }, // Exclude password from the response
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'created_at'],
        },
        {
          model: Comment,
          attributes: ['id', 'text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title'],
          },
        },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;