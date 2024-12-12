const router = require('express').Router()
const { User } = require('../../models')

// POST new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body)
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true
            res.status(200).json(userData)
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!userData) {
            console.log('no user with this email')
            res.status(500).json({ message: 'no user found with this email' })
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)
        if (!validPassword) {
            console.log('incorrect password')
            res.status(500).json({ message: 'incorrect password' })
        }

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true
            res.json({ user: userData, message: 'you are now logged in' })
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })    
    } else {
        res.status(404).end()
    }    
})    

module.exports = router
