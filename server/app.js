require('dotenv').config();
const path= require('path');
const express = require("express");
const bodyParser= require("body-parser");
const cors = require('cors');
const mongoose= require('mongoose');
const session= require('express-session');
const passport= require('passport');
const passportLocalMongoose= require('passport-local-mongoose');

const app= express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.use(cors({origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], credentials: true}));

app.use(session({
  secret: process.env.SESSION_PASSWORD,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); 

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uyq5q.mongodb.net/productivityDB?retryWrites=true&w=majority`);
// const userSchema= new mongoose.Schema({
//   username: String,
//   password: String
// });
// userSchema.plugin(passportLocalMongoose);
// const User= new mongoose.model('User', userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

function dateGetter(){
  const date= new Date();
  const day= date.getDay();
  const dayNo= date.getDate();
  const month= date.getMonth() +1;
  const year= date.getFullYear();
  
  return({day: day, dayNo: dayNo, month: month, year: year});
}
app.get('/api/date', function(req, res){
  
  res.send(dateGetter());
});
app.get('/api/today', function(req, res){
  const {dayNo, day, month, year}= dateGetter();
  
  // {
  // user: 'Jols',
  // tasks: [{
  //   date: `${month}/${dayNo}/${year}`,
  //   todoL: [['+ tasks to add', '00', '00'],['Read', '10', '05'], ['Write', '30', '10'], ['Study', '10', '00'], ['Program', '30', '01']]
  // },],
  // };
  res.send({
     date: `${month}/${dayNo}/${year}`,
     todoL: [['+ tasks to add', '00', '00'],['Read', '10', '05'], ['Write', '30', '10'], ['Study', '10', '00'], ['Program', '30', '01']]
   });
});

app.get('/api/:day/:month/:year', function(req, res){
  const {day, month, year}= req.params;
  
  res.send({
  user: 'Jols',
  date: `${day}/${month}/${year}`,
  tasks: [['Read', 0, 0], ['Write', 0, 1], ['Study', 10, 0], ['Program', 0, 0]]
  });
});

app.get('/api/user', function(req, res){
  res.json({user: req.user});
});

app.get("/api/authenticate", function(req, res){
  if (req.isAuthenticated()){
    res.json({auth: true});
  }else{
    res.json({auth: false});
  }
});

app.post("/api/register", function(req, res){
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err){
      console.log(err);
      res.status(400).send('username exists already!');
    }else{
      passport.authenticate('local')(req, res, function(){
        res.json({auth: true});
      })
    }
  })
});

app.post("/api/login", function(req, res){
  User.findOne({username: req.body.username}, function(err, userCredentials){
    if (err){
      console.log(err);
    }else{
       if (userCredentials){
         const user= new User({
          username: req.body.username,
          password: req.body.password
        });
        req.login(user, function(err){
          if (err){
            console.log(err);
          }else{
            passport.authenticate("local")(req, res, function(){
              res.json({auth: true});
            })
          }
        })
       }else{
         res.status(400).send('User does not exist, please sign up');
       }
    }
  });
});

app.get('/api/users', function(req, res){
  User.find({}, function(err, users){
    if (err){
      console.log(err);
    }else{
      const otherUsers= users.filter((userObject)=>( userObject.toString() !== req.user.toString() ));
      res.send(otherUsers);
    }
  });
});

app.get('/api/conversations', function(req, res){
  const user= req.user.username;
   Group.find({users: {$in: [user]}}, function(err, conversations){
     if (err){
       res.send(err)
     }else{
       res.send(conversations);
     }
   })
})

app.get('/api/conversations/:receiver', function(req, res){
  const receiver= req.params.receiver;
  Group.findOne({$or: [ {users: [req.user.username, receiver]}, {users: [receiver, req.user.username]} ]}, function(err, conversations){
    if (err){
      res.send(err);
    }else{
      if (conversations){
        res.json({conversations: conversations.messages})
      }else{
        res.json({conversations: []})
      }
    }
  })
});

app.post('/api/conversations/:receiver', function(req, res){
  const receiver= req.params.receiver;
  
  Group.findOne({ $or: [{users: [req.user.username, receiver]}, {users: [receiver, req.user.username]}] },
  
  function(err, groupedConvo){
    if (err){
      console.log(err);
    }else{
      const newConvo= {
        sender: req.user.username,
        message: req.body.message
      };
      
      if (groupedConvo){
        Group.findOneAndUpdate(
   { $or: [{users: [req.user.username, receiver]}, {users: [receiver, req.user.username]}] }, 
   { $push: { messages: newConvo  } },
  function (error, success) {
        if (error) {
            console.log(error);
        } else {
           res.send('sent');
        }
    });
      }else{
        const newGroupConvo= new Group({
          users: [req.user.username, receiver],
          messages: [newConvo]
        });
        newGroupConvo.save();
        res.send('sent')
      }
    }
  })
})
app.get("/api/logout", function(req, res){
  req.logout();
  res.send("logged out");
});

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
if (process.env.PORT === undefined || process.env.PORT === null ){
  var port= 8080
}else{
  var port= process.env.PORT;
}
app.listen(port, function(){
  console.log(`server is listening on ${port} `);
});