// for removing save recipe

var dataValue;
const element = document.querySelectorAll("div.content");
element.forEach((e) => {
  const Remove_button = e.lastElementChild.children[1].lastElementChild;
  Remove_button.addEventListener("click", () => {
    const Value = Remove_button.getAttribute("data-value");
    dataValue = Value;
  });
  Remove_button.addEventListener("click", () => {

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/remove_saved_searched_item", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({ remove_array: dataValue })); 
        location.reload(true);    
   });
});

