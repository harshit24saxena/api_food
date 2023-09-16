var dataValue;
const e = document.querySelector("div.detail_cuisine_body");
const element = e.querySelectorAll("div.content");
element.forEach((e) => {
  const save_button = e.lastElementChild.firstElementChild;
  save_button.addEventListener("click", () => {
    const Value = save_button.getAttribute("data-value");
    dataValue = Value
  });
  learn
  save_button.addEventListener("click",()=>{
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/saved_searched_item', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({array : dataValue}));

  })

});




