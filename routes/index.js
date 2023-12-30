var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require("passport-local");
const postMx = require('./posts');
router.use(bodyParser.urlencoded({
  extended:true
}));

passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});


router.get('/register', async function(req, res) {
res.render('register');
});

router.post('/register',async function(req,res){
  const userData = new userModel({
    username  : req.body.username,
    name      : req.body.fullname
  });

  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
     res.redirect("/dashboard"); 
    })
  });

});

router.get("/login",function(req,res){
  res.render("login")
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/dashboard",
  failureRedirect:"/login"
}),function(req,res){

});



router.get('/dashboard', async function(req, res) {
  const user = await userModel.findOne({username:req.session.passport.user})
  console.log(user.username);
  res.render("dashboard",{user});
});


router.get('/addActivity/:acname',async function(req,res){
  
   const user =await userModel.findOne({username:req.session.passport.user});
  
   if(user.joined.includes(req.params.acname))
   {
    res.render("dashboard",{user});
   }
   else{
     user.joined.push(req.params.acname);
     user.activities.push({sport : req.params.acname});
     await user.save();
     res.render("dashboard",{user});
   }
   });
  
  

router.get('/plusActivity',function(req,res){
  res.render("addactivity");
  
});


router.post('/addActivityxx',async function(req,res){
   const user = await userModel.findOne({username:req.session.passport.user});
   console.log(user.name);
   let flag = false;
   user.activities.forEach(async element => {
    if(element.sport === req.body.dplist)
    {
      element.image  = req.body.Image,
      element.caption = req.body.Caption,
      element. distraveled = req.body.Distance,
      element.duration = req.body.Duration,
      element. height = req.body.Climbing,
      element.steps = req.body.Steps,
       
    
       await user.save();
       flag = true;
    }
   });
  
   if (flag) {
    res.redirect("plusActivity");
  } else {
    res.redirect("plusActivity");
  }
});


router.get('/profile',async function(req,res){
   const user = await userModel.findOne({username:req.session.passport.user}).populate('posts');
   res.render("profile",{user});
});

router.get('/addpost',function(req,res){
  res.render("addPost");
});


router.post('/addpostx',async function(req,res){
   const user = await userModel.findOne({
    username : req.session.passport.user
   });
   const newpost = await postMx.create({
    userid: user._id,
    image : req.body.imagex,
    captionpost: req.body.caption
   });

   user.posts.push(newpost._id);
   await user.save();
   res.render("addPost");
});



module.exports = router;
