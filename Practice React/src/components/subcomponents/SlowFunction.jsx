function SlowFunction() {
  // const SlowFunction = () => {
  let value = 0;
  for (let i = 1; i <= 100000000; i++) {
    // value += i;
    value += i * (Math.random() * 100);
  }
  return value;
}

export default SlowFunction;
