const { Post, User } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }],
        });
        console.log(postData);
        const posts = postData.map((post) => post.get({ plain: true }));

        res.status(200).render('homepage', {
            posts,loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
        });
        if (!postData) {
            res.status(404).json("No Found data");
        }
        const post = postData.get({ plain: true });
        res.status(200).render('post', { post,loggedIn: req.session.loggedIn});

    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;