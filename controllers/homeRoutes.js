const router = require('express').Router()
const { User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        })
        const blogs = blogData.map((blog) =>
            blog.get({ plain: true })
        )
        console.log(blogs)
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard')
        return
    }
    res.render('login')
})

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard')
        return
    }
    res.render('signup')
})

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        })

        const commentData = await Comment.findAll({
            where: {
                blog_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
        })

        const blog = await blogData.get({ plain: true })
        const comments = commentData.map((comment) => (comment.toJSON()))

        res.render('blog', {
            blog,
            comments,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            },
            include: [
                {
                    model: Blog,
                    attributes: ['id', 'title', 'date', 'user_id']
                }
            ]
        })

        const user = userData.get({ plain: true })
        console.log(user)
        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/post', withAuth, async (req, res) => {
    try {
        res.render('post', { logged_in: req.session.logged_in })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        })

        const blog = blogData.get({ plain: true })

        res.render('edit', {
            ...blog,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
