/*
Event delegation is a technique in JavaScript that allows you to handle events for a group of 
elements by listening for events on a parent element instead of listening for events on each 
individual element.This can be useful when you have a large number of elements that you need to 
handle events for, such as a list of items or a table.
 */

// HTML code
/*
  <!-- Event delegation -->
  <div>
    <ul id="categories">
      <li id="laptops">Laptops</li>
      <li id="cameras">Cameras</li>
      <li id="shoes">Shoes</li>
    </ul>
    <!-- one more example -->
    <form id="form">
      <input type="text" placeholder="name" name="name" id="name" data-uppercase>
      <input type="text" placeholder="othername" name="othername" id="othername">
    </form>
  </div>
*/

// Event delegation
document.querySelector("#categories").addEventListener("click", (e) => {
  console.log("Categories clicked");
  //Just to make sure only the list items trigger the below functionality since any child item can trigger it.
  if (e.target.tagName == "LI") {
    console.log(e.target.id); //event bubbling to parent
  }
});

// using event delegation to add feature of changing input values to upper case.
document.querySelector("#form").addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.target.dataset.uppercase != undefined) {
    e.target.value = e.target.value.toUpperCase();
  }
});
