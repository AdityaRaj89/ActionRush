var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require("passport-local");

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

router.get('/dashboard', async function(req, res) {
  const user = await userModel.findOne({username:req.session.passport.user})
  console.log(user.username);
  res.render("dashboard",{user});
});

// router.get('/addActivity/:acname',async function(req,res){
  
//   const user =await userModel.findOne({username:req.session.passport.user});
//   if(user.activities.includes(`${req.params.acname}`))
//   res.render("dashboard",{user});
//   else{
//       user.activities.push(`${req.params.acname}`);
//   await user.save();
//   res.render("dashboard",{user});
//   }
// });


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

module.exports = router;
