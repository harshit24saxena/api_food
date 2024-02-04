
const element = document.querySelectorAll("div.content");


// for learn more functionality

var target_recipe_id =[];
element.forEach((e) => {
  const learn_more = e.lastElementChild.firstElementChild
  learn_more.addEventListener("click", () => {
    const value1 = learn_more.getAttribute("value");
    const value2 = learn_more.getAttribute("data-value");
    target_recipe_id = [value1,value2];
    })

learn_more.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/recipe/target_recipe", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({ target_id : target_recipe_id }))
})
});


// for contactMe page functionality
document.addEventListener("DOMContentLoaded", () => {
  const contactlink = document.getElementById("Contact_link");
  const contact = document.getElementById("contact");
  contactlink.addEventListener("click", (event) => {
    event.preventDefault();
    
    const toreach = contact.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: toreach,
      behavior: "smooth",
    });
  });
})

// modile layout navbar menu handlerer

  const b_menu = document.querySelector(".fa-bars")

  b_menu.addEventListener("click",()=>{
    const nav_item_display = document.querySelector(".notvisibleInMobile").classList
    const coverpage = document.querySelector(".coverpage").classList
    console.log(nav_item_display);
    
    if(nav_item_display[1]  == "display"){
      nav_item_display .remove("display")
      coverpage.remove("display")
      nav_item_display.add("flex")
  }else{
      nav_item_display.add("display")
      coverpage.add("display")
      nav_item_display.remove("flex")
    }
  })


  const s_menu = document.querySelector(".fa-magnifying-glass")
  s_menu.addEventListener("click", ()=>{
    const search_form = document.querySelector(".navbar_form").classList;
    const coverpage = document.querySelector(".coverpage").classList
  
    if(search_form[1] == "display"){
      search_form.remove("display")
      search_form.add("flex")    
    }else{
      search_form.add("display")
      search_form.remove("flex")
    }
  })
    

