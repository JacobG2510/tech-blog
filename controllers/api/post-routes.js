const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// UPDATE a blog post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a blog post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;