
const fetch = require('node-fetch') 
const bodyparser = require('body-parser') 
const nodemailer = require("nodemailer")
 require("dotenv").config() ;

// local storage config
const { LocalStorage } = require("node-localstorage") ;
const localStorage = new LocalStorage("./scratch");
const express = require('express') 

// express config
const app = express();
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public",express.static("public"));
app.use( express.static(__dirname+"/public/"));


//   home page config
app.get("/", (req, res) => {
  res.render("cuisine");
});


// home page contact form config
app.post("/", (req,res)=>{
const CN =  req.body.C_name;
const CE = req.body.C_email;
const CC = req.body.C_comment
const transport = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user:"saxena24harshit@gmail.com",
    pass:"qipbwsntzcrkdnoi"
  }
})
const Mailoption = {
    from : CE ,
    to :"saxena24harshit@gmail.com",
    subject : "food api website message from " + CN,
    text : CC 
}

transport.sendMail(Mailoption , function(ERROR , ){
  if(ERROR){
    res.send("<h1>cannot send message</h1>")
  }else{
    res.send("<h1>message sent successfully</h1>")
  }
})
res.render("cuisine")

})


// POST resquest handler for searched recipe
app.post("/searched_item", (req, res) => {    
  
  const search_item = req.body.search_cuisine;

  const p = fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&query=${search_item}&number=50`
    );
    p.then((response)=>{
      if(!response.ok){
        throw new Error("resquest failed")
      }
      return response.json()
    }).then((data)=>{
      data = data.results
      res.render("searched_item", { content: data, heading: search_item });
    })
    });
    
// GET request handler for cuisine recipe
    app.get("/:customurl", async(req, res) => {

      const customUrl = req.params.customurl;
      const p = fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&cuisine=${customUrl}&number=50`
        );
        p.then((response)=>{
          if(!response.ok){
            throw new Error("resquest failed")
          }
          return response.json()
        }).then((data)=>{
          data = data.results
          res.render("detail_cuisine", { content: data, heading: customUrl });
        })  .catch((error) => {
          console.error('Error:', error);
        });
  });
// saved recipe http request handler
let array = [];
app.post("/saved_searched_item" ,(req,res)=>{
  const parsedata = req.body.array
  array.push(parsedata);
  localStorage.setItem("saved_recipe",JSON.stringify(array))
})
app.post("/remove_saved_searched_item",(req,res)=>{
  const parsedata2 = req.body.remove_array
  let arr = JSON.parse(localStorage.getItem("saved_recipe"))

  const toremove = arr.indexOf(parsedata2)
 
    arr.splice(toremove, 1)
    localStorage.setItem("saved_recipe", JSON.stringify(arr))

})

//GET request handler for saved recipe
app.get("/nav_link/saved_recipe", async(req, res) => {
  console.log("connected");
  let saved_recipe = localStorage.getItem("saved_recipe");
  if(saved_recipe.length !== 0 ){
  saved_recipe = JSON.parse(saved_recipe);

    const fetchpromise = saved_recipe.map(async(recipe)=>{
      const response = await fetch(  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&query=${recipe}&number=1`)
   
        if(!response.ok){
          throw new Error("request failed")
        }
        const data = await response.json()
        return data.results
      })  

    let recipe_data = await Promise.all(fetchpromise)

    res.render("saved_recipe",{content : recipe_data})

    }else{
      res.render("saved_recipe")
    }

  });

// POST request handler for learn more section
let parsedata
  app.post("/recipe/target_recipe",(req,res)=>{
    parsedata = req.body.target_id
});

// GET requet handler for learn more section
 app.get("/recipe/target_recipe", (req,res)=>{
  const [recipe_id, heading] = parsedata  
const p =  fetch(`https://api.spoonacular.com/recipes/${recipe_id}/analyzedInstructions?apiKey=${process.env.apiKey}`)
p.then((response)=>{
  if(!response.ok){
    throw new Error("resquest failed")
  }
  return response.json()
}).then((data)=>{
  array =  data[0].steps;
  res.render("learn_more" , {content : array , heading:heading})
})  .catch((error) => {
  console.error('Error:', error);
});
});

// sever port listener
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("server starting at port "+port );
});
