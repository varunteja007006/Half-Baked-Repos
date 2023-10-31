# Practice TypeScript

To use TypeScript we need to install Node and then install TypeScript Compiler. The TypeScript Compiler
allows use to compile TypeScript files

```
npm install -g typescript
```

Compile the TypeScript files as follows

> tsc FILENAME

TypeScript Types:

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
