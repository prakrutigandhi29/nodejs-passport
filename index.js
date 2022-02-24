const express=require('express');
const session=require('express-session');
const app=express();
const passport=require('passport');
const conn=require('./config');
const LocalStrategy=require('passport-local').Strategy;
debugger;
app.use(express.json());
app.use(session({ secret: 'SECRET' }))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
    const sql="select * from user where name = ? and password = ?"
    console.log(username,password);
      conn.query(sql,[username,password],(err, user)=> {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      })
    }));
  
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
      res.json(req.user);
    });


app.listen(5000);