const router = require('express').Router();
const { Post } = require('../../models');

// CREATE new post
router.get('/', async (req, res) => {
    try {
      const dbPostData = await Post.findAll();
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

router.post('/', async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      description: req.body.description,
      post_date: req.body.post_date,
      user_id: req.body.user_id,
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