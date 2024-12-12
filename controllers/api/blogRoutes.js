const router = require('express').Router()
const { Blog, User, Comment } = require('../../models')
const withAuth = require("../../utils/auth")

// GET a single blog, and populate its comment data
router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['body']
                }
            ]
        })

        const blog = blogData.get({ plain: true })

        res.render('blog', {
            ...blog
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// POST new blog
router.post('/', async (req, res) => {
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
    console.log(req.body);
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

// POST a new comment
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create({
      body: req.body.comment_body,
      blog_id: req.body.blog_id,
      user_id: req.session.user_id || req.body.user_id,
    });

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
})

// PUT to edit a comment
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(400).json({ message: 'no comment found' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// DELETE a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!comment) {
      res.status(404).json({ message: 'no comment found' })
      return
    }
    
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router
