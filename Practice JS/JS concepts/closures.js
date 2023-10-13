function outermost() {
  let a = 10;
  function outer(c) {
    let b = "Hello";
    function inner() {
      console.log(a, b, c);
    }
    return inner;
  }
  return outer;
}

let outermost_func = outermost()("Mom"); // first initializing outermost() and then outer() since outer accepts arguments we pass 'Mom'
outermost_func(); // now we initialize the inner() it console logs >> 10 Hello Mom
