// A callback function is a function that is passed as an argument to another function.
// It is typically used to execute code after another function has finished executing.
// This can be useful for handling asynchronous events, such as waiting for a response from a server or the completion of an animation.

// Similarly setTimeout takes a callback function.
setTimeout(function () {
  console.log("Timer");
}, 3000);

function x(params) {
  console.log("This is function x");
  params();
}

// Here function y is callback function.
x(function y(params) {
  console.log("This is function y");
});
