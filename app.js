const express = require("express");
const bodyparser = require("body-parser");
const {LocalStorage} = require("node-localstorage");

localStorage = new LocalStorage('./scratch')


const app = express();
app.set("view engine", "ejs");


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("cuisine");
});

app.post("/searched_item",(req , res) => {
  const search_item=req.body.search_cuisine;

  const p = fetch(
  "https://api.edamam.com/api/recipes/v2?type=public&q="
   +search_item +
  "&app_id=c70a12ec&app_key=f050dd5ff8dfe333361453943866b5c3"
  );
  p.then((response)=>{
    if(!response.ok){
      throw new Error("resquest failed")
    }return response.json();
  }).then((data)=>{
    data = data.hits;
    if(data == 0){
      res.render("cuisine")
    }else{
      res.render("searched_item", {content : data , heading : search_item})
    }

  })
})


app.get("/:customurl", (req,res)=>{
  const customUrl = req.params.customurl;
  const p = fetch(
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    customUrl +
    "&app_id=c70a12ec&app_key=f050dd5ff8dfe333361453943866b5c3"
  );
  p.then((response)=>{
    if(!response.ok){
      throw new Error("resquest failed");
    }return response.json();
  }).then((data)=>{
    data = data.hits;
    
    res.render("detail_cuisine", {content : data , heading : customUrl})
  })
})

app.get("/nav_link/saved_recipe" , (req, res)=>{
  localStorage.getItem
})

const recipe_array = [];
app.post("/saved_recipe" , async(req,res)=>{

  const recipe = req.body.saved_recipe;
  // console.log(recipe)
  // console.log(JSON.stringify (recipe_array))

  if(recipe_array.length == 0){
    recipe_array.push(recipe);
    console.log("add frist item in array")
  }else{
    for( i =  0; i = recipe_array.length ; i++){
      if(JSON.stringify (recipe_array[i]) == recipe){
        console.log('already exist')}
      }
        // recipe_array.push(recipe);
        // console.log(recipe_array);
      }
      

  
  
  localStorage.setItem("saved_recipe",JSON.stringify (recipe_array));

})

app.listen(3000, () => {
  console.log("server starting at port 3000");
});
