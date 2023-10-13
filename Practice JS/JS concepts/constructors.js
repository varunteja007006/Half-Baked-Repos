//constructor
class Counter {
  constructor() {
    let count = 0;
    this.increment = function () {
      count++;
      console.log(count);
    };

    this.decrement = function () {
      count--;
      console.log(count);
    };
  }
}

let counter_func = new Counter();
counter_func.increment();
