/*
  HTML code
  <div id="grandparent">
    <div id="parent">
      <div id="child">
      </div>
    </div>
  </div>

*/

// Event bubbling
document.querySelector("#grandparent").addEventListener("click", () => {
  console.log("grandparent clicked");
});
document.querySelector("#parent").addEventListener("click", () => {
  console.log("parent clicked");
});

document.querySelector("#child").addEventListener("click", () => {
  console.log("child clicked");
});

// Event capturing or trickling --> pass third argument in the addEventListener (by default it is false)
document.querySelector("#grandparent").addEventListener(
  "click",
  () => {
    console.log("grandparent clicked");
  },
  true
);
document.querySelector("#parent").addEventListener(
  "click",
  (e) => {
    console.log("parent clicked");
    e.stopPropagation(); // to stop propagation
  },
  true
);

document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log("child clicked");
  },
  true
);
