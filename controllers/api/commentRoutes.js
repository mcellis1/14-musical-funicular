const router = require('express').Router()
const { Blog, User, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// POST a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            body: req.body.comment_body,
            user_id: req.session.user_id || req.body.user_id,
            blog_id: req.body.blog_id,
        });

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
})

// PUT to edit a comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        })

        if (!commentData) {
            res.status(400).json({ message: 'no comment found' })
            return;
        }

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE a comment
router.delete('/:id', withAuth, async (req, res) => {
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

module.exports = router;
