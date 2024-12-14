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
                }
                // {
                //     model: Comment,
                //     attributes: ['body']
                // }
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
router.get('/dashboard', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login')
        return
    }
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
})

router.get('/post', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login')
        return
    }
    res.render('post', { logged_in: req.session.logged_in })
})

router.get('/blog/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login')
        return
    }

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
            ...blog,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/edit/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login')
        return
    }

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
