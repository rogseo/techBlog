const router=require('express').Router();

router.get('/', async(req, res)=>{
    try{
        res.render('homepage');

    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;