const { Post, User } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/withAuth');

router.get('/',async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }],
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.status(200).render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            user_id:req.session.user_id,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});
//Can access to post data only when logged in.
router.get('/post/:id', withAuth, async (req, res) => {
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