const router = require('express').Router()
const { User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth')

// GET route for all blog posts and populate its user data
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
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
        const blogs = blogData.map((blog) => {
            blog.get({ plain: true })
        })

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// GET if use is already logged in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard')
        return
    }
    res.render('login')
})

// GET if use is already logged in
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard')
        return
    }
    res.render('signup')
})

// GET if use is already logged in
router.get('/dashboard', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login')
        return
    }
    res.render('dashboard')
})

module.exports = router
