// function alertMe() {
//   alert("You clicked me !!!");
// }
// const btn = document.getElementById("sampleClick");
// btn.onclick = () => {
//   alert("this is weird!!");
// };

// const form = document.getElementById("handleForm");
// form.onsubmit = (e) => {
//   e.preventDefault();
//   const data = new FormData(e.target);
//   console.log(data.get("name"));
//   const dataObj = Object.fromEntries(data.entries());
//   console.log(dataObj);
// };

/* Infinite scrolling
let count = 2;

function loadMoreContent() {
  count += 1;
  const main = document.querySelector("main");
  main.style.minHeight = `${count * 200}vh`;
  console.log("getting data");
}

const THRESHOLD = 200;

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const totalHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  console.log(
    `Total height: ${totalHeight}`, // 2716
    `Window Height: ${windowHeight}` // 663
  );

  console.log(`Scroll Position: ${scrollPosition}`);
  console.log(totalHeight - (scrollPosition + windowHeight));

  if (totalHeight - (scrollPosition + windowHeight) < THRESHOLD) {
    console.log("Load More...");
    loadMoreContent();
  }
});
 */
