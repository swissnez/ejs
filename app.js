//jshint esversion:6

const express = require("express"),
bodyParser = require("body-parser"),
ejs = require("ejs"),
_ = require("lodash"),
mongoose = require("mongoose");

//const urlCluster = `mongodb+srv://${user}:${pass}@cluster0-fp39t.mongodb.net/`;
const url = 'mongodb://localhost:27017/',
dbName = 'todolistDB';
mongoose.connect(url+dbName,{ useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000 || process.env.PORT;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.listen(port,console.log(`Server started on port ${port}`));


const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post",postSchema);



const contactContent = "Contact info.....";


const composedSeed = [];

exports.dataStorage = (posts) => {
      return posts;
};


//Routes 

app.get("/about",(req,res)=>{
  res.render("about",{about:contactContent});
  
});

app.get("/contact",(req,res)=>{
  res.render("contact",{contact:contactContent});
});

app.get("/compose",(req,res)=>{
  res.render("compose");
});

app.get("/home",(req,res)=>{
  res.render("home",{posts:composedSeed});
});

app.post("/compose",(req,res)=>{
  
const myPost = new Post({title: req.body.postTitle,content: req.body.postBody});

  myPost.save((err)=>{
    if(!err) {
      res.redirect("/");
    } 
  });

});

app.get("/",(req,res)=> {

  Post.findOne({},(err,found)=>{
    if(found) {
      composedSeed.push(found);
      composedSeed.forEach(post=>{
        post.content = truncation(post.content,300); 
      }); 
    }
  });
        res.render("home",{posts:composedSeed});
});


app.get("/post",(req,res)=>{
      res.render("post",{posts:composedSeed,homeContent:contactContent});
});

app.get("/post/:postTag",(req,res)=>{ 

  let postTag = req.params.postTag;

  Post.findOne({title:postTag},(err,found)=>{
      if(found) {
        res.redirect("/post");
      } else {
        res.send(err);
      }
  });

  // composedSeed.find(e=>{
  //     if (_.lowerCase(e.title) == _.lowerCase(req.params.postTag)) { // Match
  //       requestedPosts.push(e);     
  //     }

  // let newPost = new createNewPost(req.body.postTitle,req.body.postBody);
  
  // function createNewPost(title,composeText) { // Creates a new object ES6 constructor
  //   return {
  //     title,
  //     composeText,
  //   };
  // }
  // composedSeed.push(newPost);
  });

function truncation(truncatedText,textLength) {
  return _.truncate(truncatedText,{length:textLength});
}


// Using parameters req.params NOTE Since the hyphen (-) and the dot (.) are interpreted literally,
app.get("/flights/:from-:to",(req,res)=> {
  console.log("From:" + req.params.from + " To: "+req.params.to);
  res.send(req.params);
});

app.get("/match/:team1-:team2",(req,res)=> { // (-) and the dot (.) are interpreted literally,
  res.write("<h1>"+req.params.team1+"</h1>");
});

app.get("/user/:userId(\d+)",(req,res)=>{ //Request URL: http://localhost:3000/user/42
  res.send(req.params);
});


