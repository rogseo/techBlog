const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/withAuth')

// CREATE new post
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include:[
        {
          model:Comment,
          attributes: [
            'id',
            'text',
            'post_id',
          ],
        },{
          model:User,
          attributes:['id',],
        },],
      where : {
        user_id: req.session.user_id,
      },
    });
    if (!dbPostData) {
      res.json("no found data");
    }
    console.log(dbPostData);
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.status(200).render('dashboard', { posts, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    const dbPostData = await Post.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id,
    });
    if (!dbPostData) {
      res.json("no added");
    }
    else {
      res.status(200).json(dbPostData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  const postData = await Post.findByPk(req.params.id);
  const post = postData.get({ plain: true });
  res.status(200).render('editPost', {
    post,
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
  });

});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      });

    if (!postData[0]) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    const post = postData.get({ plain: true });
    res.status(200).render('post', {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).redirect('/api/posts');
  } catch (err) {
    res.status(500).json(err);
  }
});

//if add post button click
router.get('/add', withAuth, async (req, res) => {
  console.log("this is add route");
  res.render('addPost'); // need to be solved


});
module.exports = router;