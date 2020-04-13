//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const app = express();
const port = 3000 || process.env.PORT;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(port,()=> {
  console.log(`Server started on port ${port}`);
});


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const composedSeed = [];

exports.dataStorage = () => {
  return composedSeed;
};


//Routes 

app.get("/about",(req,res)=>{
  res.render("about",{about:aboutContent});
  
});

app.get("/contact",(req,res)=>{
  res.render("contact",{contact:contactContent});
});

app.get("/compose",(req,res)=>{
  res.render("compose");
});

app.post("/compose",(req,res)=>{
  
  let newPost = new createNewPost(req.body.postTitle,req.body.postBody);
  
  function createNewPost(title,composeText) { // Creates a new object ES6 constructor
    return {
      title,
      composeText,
    };
  }
  composedSeed.push(newPost);
  res.redirect("/");
});

app.get("/",(req,res)=> {
  res.render("home",{posts:composedSeed});
});

app.get("/json",(req,res)=>{ // Testing JSON with seeds array! 
  res.json(composedSeed);
});

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
