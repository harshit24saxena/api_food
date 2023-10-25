const observer = new IntersectionObserver(entries =>{
    const toggle = document.querySelector(".visibleInMobile").classList
    if(entries[0].isIntersecting){
        toggle.add("contrast")
    }else if(!entries[0].isIntersecting){
        toggle.remove("contrast")
    }
})
const titleSection = document.querySelector(".header")
observer.observe(titleSection)