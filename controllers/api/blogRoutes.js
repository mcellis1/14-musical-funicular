const router = require('express').Router()
const { Blog, User, Comment } = require('../../models')
const withAuth = require("../../utils/auth")

// POST new blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id
    })
    res.status(200).json(newBlog)
  } catch (err) {
    res.status(500).json(err)
  }
})

// PUT to edit a blog
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'no blog post found' });
      return
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// DELETE a blog and its comments delete on cascade
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'no blog post found' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router
