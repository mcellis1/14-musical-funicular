const router = require('express').Router()
const { Blog, Comment } = require('../../models')

// GET a single blog, and populate its comment data
router.get()

// POST new blog
router.post()

// PUT to edit a blog
router.put()

// DELETE a blog and its comments delete on cascade
router.delete()

// POST a new comment
router.post()

// PUT to edit a comment
router.put()

// DELETE a comment
router.delete()

module.exports = router
