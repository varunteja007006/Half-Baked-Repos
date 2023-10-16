function greet() {
  return "hello";
}

function name(name, func) {
  const greetMessage = func();
  console.log(greetMessage, name);
}

name("Varun", greet);
