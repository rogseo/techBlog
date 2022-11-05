const router = require('express').Router();
const { Post, User,Comment } = require('../../models');
const withAuth=require('../../utils/withAuth');

// CREATE new post
router.get('/', withAuth, async (req, res) => {
    try {
      const dbCommentData = await Comment.findAll({
        include: [{
            model: User,
            model: Post,
        }],
      });
      if(!dbCommentData){
          res.json("no added");
      }
      else{
        const comments = dbCommentData.map((comment) => comment.get({ plain: true }));
          res.status(200).render('comment',comments);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  module.exports = router;

router.post('/',withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      text: req.body.text,
      post_date: req.body.post_date,
      post_id: req.body.post_id,
      user_id: req.body.user_id,
    });
    if(!dbCommentData){
        res.json("no added");
    }
    else{
        res.status(200).json(dbCommentData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;