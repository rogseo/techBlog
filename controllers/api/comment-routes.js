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

  //debug reason withAut removed
  router.post('/', async (req, res) => {
  try {
    console.log(req.session.user_id);
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
    // if(!dbCommentData){
    //     res.json("no added");
    // }
    // else{
    //     res.status(200).redirect(`/api/posts/${post_id}`);
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;