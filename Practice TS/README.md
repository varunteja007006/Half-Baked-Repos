# Practice TypeScript

## About TypeSCript

TypeScript is a programming language that builds on JavaScript, giving you better tooling at any scale. 
It is a superset of JavaScript, which means that all valid JavaScript code is also valid TypeScript 
code. However, TypeScript adds optional type annotations to JavaScript, which can help to catch errors 
early and make your code more readable and maintainable.

TypeScript is compiled to JavaScript, so you can use it with any existing JavaScript codebase. It is
also supported by all major JavaScript frameworks and libraries, such as React, Angular, and Vue.

TypeScript is a popular choice for developing large and complex JavaScript applications. It is used 
by companies such as Google, Microsoft, and Amazon.

Here are some examples of how TypeScript can be used:

- To define the types of function parameters and return values: This can help to prevent errors and 
make your code more robust.

- To define the types of variables and object properties: This can help to improve the readability 
and maintainability of your code.

- To enforce coding conventions: TypeScript can be used to ensure that your code follows a consistent 
set of coding conventions, such as those defined by the Airbnb JavaScript Style Guide.

## Install TypeScript

To use TypeScript we need to install Node and then install TypeScript Compiler. The TypeScript Compiler
allows use to compile TypeScript files

```
npm install -g typescript
```

Compile the TypeScript files as follows

> tsc FILENAME

## TypeScript Notes

Learn TypeScript using documentation https://www.typescriptlang.org/docs/handbook/2/basic-types.html

### TypeScript Types:

- number
- string
- boolean
- null
- undefined
- void
- object
- array
- tuples
- any
- never
- unknown
- and much more.....

## TypeScript Code

simple use of typescript

````ts
const a: number = 10;
console.log(a);

const str: string = "hello";
console.log(str);```
````

Creating a simple function

```ts
// create a function that accepts number and returns number
function addTwo(num: number): number {
  // num.toUpperCase(); // This is not allowed
  return num + 2;
}
addTwo(2);
```

One more example on creating a function in TypeScript

```ts
// By default signUp(email: any, name: any, password: any, age: any): string
function signUp(email, name, password, age) {
  return ``;
}
//We need to avoid the 'any' type inference. We can do that as below

function signUpTS(email: string, name: string, password: string, age: number) {
  return ``;
}
```

Providing Default values to parameters of a function

```ts
function signUpTS(
  email: string,
  name: string,
  password: string,
  age: number = 18
) {
  return ``;
}

signUpTS("dummy@test.com", "Carl", "S&orIwe!sda");
```
