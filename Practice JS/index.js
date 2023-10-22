// create a element
// const buttonCreateElement = document.getElementById("createElement");
// buttonCreateElement.onclick = (e) => {
// e.preventDefault();
// const element = document.createElement("div");
// element.textContent = "new element";
// document.body.appendChild(element);
// };

// Event delegation
document.querySelector("#categories").addEventListener("click", (e) => {
  console.log("Categories clicked");
  //Just to make sure only the list items trigger the below functionality since any child item can trigger it.
  if (e.target.tagName == "LI") {
    console.log(e.target.id); //event bubbling to parent
  }
});

document.querySelector("#form").addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.target.dataset.uppercase != undefined) {
    e.target.value = e.target.value.toUpperCase();
  }
});
