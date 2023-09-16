const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer")
const axios = require('axios');
const cheerio = require('cheerio');
require("dotenv").config();

const { LocalStorage } = require("node-localstorage");

localStorage = new LocalStorage("./scratch");

const app = express();
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("cuisine");
});

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

transport.sendMail(Mailoption , function(ERROR , info){
  if(ERROR){
    res.send("<h1>cannot send message</h1>")
  }else{
    res.send("<h1>message sent successfully</h1>")
  }
})
res.render("cuisine")

})

let array = [];
app.post("/saved_searched_item" ,(req,res)=>{
  const parsedata = req.body.array
  array.push(parsedata);
  localStorage.setItem("saved_recipe",JSON.stringify(array))
})


app.post("/searched_item", (req, res) => {    
  
  const search_item = req.body.search_cuisine;
  const p = fetch(
    ` https://api.edamam.com/api/recipes/v2?type=public&q=${search_item}&app_id=c70a12ec&app_key=f050dd5ff8dfe333361453943866b5c3`
    );
    p.then((response) => {
      if (!response.ok) {
        throw new Error("resquest failed");
      }
      return response.json();
    }).then((data) => {
      data = data.hits;
        
        if (data == 0) {
          res.render("cuisine");
        } else {
          res.render("searched_item", { content: data, heading: search_item });
        }
      });
    });
    
    app.get("/:customurl", (req, res) => {
      const customUrl = req.params.customurl;
      const p = fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q= ${customUrl}&app_id=c70a12ec&app_key=f050dd5ff8dfe333361453943866b5c3`
        );
        p.then((response) => {
    if (!response.ok) {
      throw new Error("resquest failed");
    }
    return response.json();
  }).then((data) => {
    data = data.hits;
    res.render("detail_cuisine", { content: data, heading: customUrl });
  });
});


app.get("/nav_link/saved_recipe", async(req, res) => {
  let saved_recipe = localStorage.getItem("saved_recipe");
  saved_recipe = JSON.parse(saved_recipe);

    const fetchpromise = saved_recipe.map(async(recipe)=>{
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q= ${recipe}&app_id=c70a12ec&app_key=f050dd5ff8dfe333361453943866b5c3`)
   
        if(!response.ok){
          throw new Error("request failed")
        }
        const data = await response.json()
        return data.hits[0]
    })


    const recipe_data = await Promise.all(fetchpromise)
    res.render("saved_recipe",{content : recipe_data})
  });
  app.get("/recipe/learn_more",(req,res)=>{
    res.render("learn_more")
  })

  

app.listen(3000, () => {
  console.log("server starting at port 3000");
});
