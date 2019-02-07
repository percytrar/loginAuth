const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const {Users} = require('./models') 

passport.use(new LocalStrategy(
    async (username,password,done)=>{
        try{
            const user = await Users.findOne({
                where:{
                    username:username
                }
            })
            if(!user)
                return done(null,false,{message:'Username Invalid!'})
            if(user.password !== password)
                return done(null,false,{message:'Incorrect Password!'})
            done(null,user)
        }catch(e){
            console.error(e)
            done(e)
        }
    }
))

passport.serializeUser((user,done)=>{
    console.log("Serializing User: "+user.username+"\nUSerID:"+user.id)
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    console.log("userID: " +id)
    Users.findOne({
        where:{
            id
        }        
    })
    .then((user)=>done(null,user))
    .catch(done)
})

module.exports = passport