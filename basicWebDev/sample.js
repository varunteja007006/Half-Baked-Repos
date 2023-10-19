function alertMe() {
  alert("You clicked me !!!");
}
const btn = document.getElementById("sampleClick");
btn.onclick = () => {
  alert("this is weird!!");
};

const form = document.getElementById("handleForm");
form.onsubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  console.log(data.get("name"));
  const dataObj = Object.fromEntries(data.entries());
  console.log(dataObj);
};
