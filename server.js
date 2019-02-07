// require('bootstrap')
const express = require('express')
const session = require('express-session')
const {
    db,
    Users
} = require('./models')
const passport = require('./passport')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','hbs')
app.use(express.static(__dirname+"/public"))
app.use(session({
    secret:'45sd5fs5fsfgdfg21ggf69fef87jyujjqwq',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.get('/login', (req, res) => {
    console.log('Inside Login!')
    res.render('login')
})
app.get('/signup', (req, res) => res.render('signup'))

app.post('/signup',async (req,res)=>{
    try{
        const user = await Users.create({
            username:req.body.username,
            password:req.body.password
        })
        if(!user) throw new Error('Error creating User!')
        return res.redirect('/login')
    }catch(e){
        res.redirect('/signup')
    }
})

app.post('/login',passport.authenticate(
    'local',
    {
        failureRedirect:'/login',
        successRedirect:'/profile',
    }
))
app.get('/profile',(req,res)=>{
    // console.log(req.user)
    if(req.user)
        return res.render('profile',{user:req.user})
    else
        return res.redirect('/login')
})
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  })

db.sync()
    .then(()=>{
        app.listen(1000,()=>{
            console.log('SERVER STARTED AT: http://localhost:1000')
        })
    })
