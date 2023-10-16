function alertMe() {
  alert("You clicked me !!!");
}
    const btn = document.getElementById("sampleClick");
    btn.onclick = () => {
      alert("this is weird!!");
    };
    console.log(btn);