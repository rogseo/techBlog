const router = require('express').Router();
const { Post } = require('../../models');
const withAuth=require('../../utils/withAuth')

// CREATE new post
router.get('/', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
        where:{
          user_id:req.session.user_id,
        }
        });
      if(!dbPostData){
          res.json("no found data");
      }
      console.log(dbPostData);
      const posts = dbPostData.map((post)=>post.get({ plain: true }));
      res.status(200).render('dashboard', { posts,loggedIn: req.session.loggedIn});

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


router.post('/',withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      description: req.body.description,
      post_date: req.body.post_date,
      user_id: req.session.user_id,
    });
    if(!dbPostData){
        res.json("no added");
    }
    else{
        res.status(200).json(dbPostData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;