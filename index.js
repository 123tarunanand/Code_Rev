var express=require("express");
var bodyParser=require('body-parser');
var app = express();
var connection = require('./config');
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var session = require('client-sessions');
var edprof =  require('./controllers/editprofile')
var profile = require('./controllers/profile')
var post = require('./controllers/postnew')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));


app.get('/register', function (req, res) {
  if(req.session.user)
  {
    return res.redirect('/home');
  }
   res.render( __dirname + "/templates/" + "reg.html",{message:req.query.message});
})

app.get('/logout',function(req,res){
  req.session.reset()
  return res.redirect('/')
})

app.get('/', function (req, res) {
  if(req.session.user )
  {
    return res.redirect('/home');
  }
   res.render( __dirname + "/templates/" + "login.html" ,{message:req.query.message});
})

app.get('/home',function(req,res){
  if(!req.session.user)
  {
    return res.redirect('/')
  }
  res.render(__dirname+"/templates/"+"home.html",{username:req.session.user});
})

app.get('/profile',profile.profileload);

app.get('/profile/edit',function(req,res){
  if(!req.session.user)
  {
    return res.redirect('/')
  }
  res.render(__dirname+"/templates/"+"edit.html",{username:req.session.user,message:req.query.message});
})

app.get('/posts/new',function(req,res){
  if(!req.session.user)
  {
    return res.redirect('/')
  }
  res.render(__dirname+"/templates/"+"newpost.html",{message:req.query.message});
})

app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.post('/controllers/editprofile',edprof.edit)
app.post('/controllers/postnew',post.newpost)
app.listen(8012);
