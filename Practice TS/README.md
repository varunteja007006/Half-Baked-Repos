# Practice TypeScript

## About TypeScript

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

    tsc FILENAME.ts

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

## TypeScript Basics

**Simple use of typescript**

````ts
const a: number = 10;
console.log(a);

const str: string = "hello";
console.log(str);```
````

**Literal Types**

```ts
let verticalAlignment: "top" | "middle" | "bottom";

verticalAlignment = "top";

verticalAlignment = "left";
/* 
this throws an error Type '"left"' is not assignable to type '"top" | "middle" | "bottom"'
*/
```

another example,

```ts
let pi: 3.14 = 3.14;

pi = 5; // this throws an error - Type '5' is not assignable to type '3.14'.
```

### Functions in TypeScript

**Creating a simple function**

Here the function 'addTwo' returns number and it takes a parameter 'num' of number type.

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

**Providing Default values to parameters of a function**

```ts
function signUpTS(
  email: string,
  name: string,
  password: string,
  age: number = 18
): number {
  return 0;
}

signUpTS("dummy@test.com", "Carl", "S&orIwe!sda");
```

**Arrow functions in TypeScript**

Here we are passing a 'param' of string type and the function returns number.

```ts
const func = (param: string): number => {
  return 0;
};
```

**Map function**

Always a good idea to specify the return type while using a Map function.

```ts
const data = ["charlie", "harry", "bard", "sammy"];

data.map((item): string => {
  return `Hey ${item}`;
  // return 0 // This will throw an error
});
```

Few other function examples,

**Return void**

This function returns a void, because it is only console logging an error message.

```ts
function consoleData(errorMsg: string): void {
  console.log(errorMsg);
  // return 'Error happened!!' // This will throw an error
}
```

**Return never**

Why use never instead of void? Void means it is returning nothing, whereas never means that the function
throws an exception or terminates execution of the program. The never type represents values which are
never observed.

```ts
function handleError(errorMessage: string): never {
  throw new Error(errorMessage); // This throws an error
}
```

A function that takes in parameters and returns an object can be written as follows

```ts
function createCourse(
  courseName: string,
  coursePrice: number
): { courseName: string; coursePrice: number } {
  return { courseName: courseName, coursePrice: coursePrice };
}
```

**Object Parameters in Function**

Dealing with object data as parameters in function.

```ts
function processUser({ username: string, paymentID: number }): string {
  return "Success";
}

processUser({
  username: "test_user",
  paymentID: 435343,
  email: "test_user@dummy.com",
  /* 
    This throws an error because we are passing an extra argument 'email' which is not accepted as parameter
    in function 'processUser'.
  */
});

const userData = {
  username: "test_user",
  paymentID: 435343,
  email: "test_user@dummy.com",
};

processUser(userData);
/* 
  This does not throw an error even though we are passing the email which is absent as a parameter 
  in the function 'processUser'.

  This can be resolved. Check topic - "Type Alias in TypeScript"
*/
```

**Type Alias in TypeScript**

Using 'type' alias

```ts
type User = {
  username: string;
  paymentID: number;
  email: string;
};

/*  
This function 'processUser' should take 'User' type objects as parameters.
It should also return the type 'User' object

This way we can avoid the issue we faced in the topic - "Object Parameters in Function"
*/

function processUser(user: User): User {
  return { ...user };
}

processUser({
  username: "strongTitan",
  paymentID: 43434,
  email: "strongTitan@test.com",
  test: "", // This will throw an error because this property is not available in type "User"
});
```

**Using readonly**

This readonly type will not allow to modify the property.

```ts
type User = {
  readonly _id: string;
  username: string;
  paymentID: number;
  email: string;
};

let userOne: User = {
  _id: "ersse554823fsd",
  username: "testDummy",
  paymentID: 5161331,
  email: "testDummy@test.com",
};

userOne.email = "dummyTest@dummy.com";
userOne._id = "596sfasf"; // This throws an error because '_id' is readonly,
```

**Optional properties**

If we have some properties that are optional, then we have to mention '?' before colon. Check the below
code snippet.

```ts
type User = {
  readonly _id: string;
  username: string;
  paymentID: number;
  email: string;
  creditCardNumber?: number; // This is an optional property. We use '?' before colon to mention it has optional
};

let userOne: User = {
  _id: "ersse554823fsd",
  username: "testDummy",
  paymentID: 5161331,
  email: "testDummy@test.com",
};
```

**Appending the types to a new type**

Here if we have more than one types and want to combine them to create a new type then we can use '&'.

```ts
type CredCardNumber = {
  credCardNumber: number;
};

type CredCardDate = {
  credCardDate: string;
};

type CredCardDetails = CredCardNumber &
  CredCardDate & {
    credCardCVV: number;
  };

const cardOne: CredCardDetails = {
  credCardNumber: 546516165,
  credCardDate: "02/89",
  credCardCVV: 566,
};
```

**type Arrays**

```ts
const emptyArray: [] = []; // this is a type of array never
emptyArray.push("Hello"); // this throws error string type cannot be assigned to never type

const tasks: string[] = []; // One way of declaring type array
tasks.push("Eat");

const ids: Array<number> = []; // Another way of declaring type array
ids.push(5050);
```

**More Arrays**

```ts
const data: string[] | number[] | boolean[] = ["test", 2, true];
// the above line throws an error - Type '(string | number | true)[]' is not assignable to type 'string[]'

//correct code is
const dataOne: (string | number | boolean)[] = ["test", 1, false];
```

**Assigning type User to Array**, User is an object with properties username & payment id.

```ts
type User = {
  username: string;
  paymentID: number;
};

const allUsers: User[] = [];

allUsers.push(""); // throws error because 'allUsers' is type User.

allUsers.push({ username: "Ben", paymentID: 123123 });
```

**2D Arrays**

```ts
const matrix2D: number[][] = [
  [255, 233, 244],
  [245, 203, 144],
  [95, 123, 140],
  [],
];
matrix2D.push(["hello", "world", "!"]); // this throws an error because we are passing array of strings

matrix2D.push([1, 2, 3]);
```

**Union of Types**

```ts
let username: number | string = "testDummy";

username = true; // this throws an error because username is either number or string.

username = 85262;
```

**Union of Types** which are **Objects**

```ts
type User = {
  email: string;
  id: number;
};

type Admin = {
  username: string;
  email: string;
  adminId: number;
};

let userOne: User | Admin = { email: "testDummy@test.com", id: 1 };

// If the userOne can be an Admin also then,

userOne = { username: "testDummy", email: "testDummy@test.com", adminId: 1 };
```

**Functions & its parameter/s of Union Types**

```ts
function getData(username: number | string) {
  username.toLowerCase(); // this throws an error since username can be number or string.
}
```

To avoid the above error we need to check the types of parameters.

```ts
function getData(username: number | string) {
  if (typeof username === "string") {
    username.toLowerCase();
  } else {
    username = username.toString();
  }
  console.log(typeof username, username);
}

getData("hello"); // output: string hello
getData(123); // output: string 123
```

**Tuples in TypeScript**

```ts
let user: (string | number | boolean)[] = ["test", 1, true];
// one problem is that the order can be changed. For example,
user = [false, "dummy", 2];

// In order to not change the order we use tuples.

let newUser: [string, number, boolean] = ["test", 3, true];

newUser = [3, false, "dummy"]; // this will throw an error because the values are not in order.

// Real-life use case of tuples in TypeScript
let rgb: [number, number, number] = [125, 255, 200];
rgb = [120, 200, 400, 0.5];
// this throws an error because you cannot add an extra value (in this case transparency)
```

**Issues with tuples**

```ts
let rgb: [number, number, number] = [125, 255, 200];

rgb.push(244); // unfortunately tuples can have issues like Array push, pull, shift , unshift can modify it.

console.log(rgb);
```

Enums in TypeScript

```ts
enum SeatChoice { // By default enums will be having values, you can override them.
  AISLE, //this will be 0
  MIDDLE_AISLE = "middle_aisle",
  MIDDLE_WINDOW = 14,
  WINDOW, // this will be 15 since its previous value is modified.
}

const selectSeat = SeatChoice.AISLE;
const selectSeat1 = SeatChoice.MIDDLE_WINDOW;
const selectSeat2 = SeatChoice.MIDDLE_AISLE;

console.log(selectSeat, selectSeat1, selectSeat2);
```

**Interface in TypeScript**

```ts
interface User {
  readonly _id: number;
  email: string;
  userID?: number;
  // creating a method type
  showData: () => number;
  // another way of creating a method type
  showEmail(): string;
  //passing parameters in method type
  getHike(name: string, percentage: number): number;
}

let userData: User = {
  _id: 2342,
  email: "testDummy@test.com",
  userID: 12,
  showData: () => {
    return 1;
  },
  showEmail: () => {
    return "Email";
  },
  /*

  getHike: (name: "annual", percentage: "ten") => {
    // throws an error because the percentage type is number but we provided string
    return 0;
  }, 
  
  */
  getHike: (name: "annual", percentage: 10) => {
    return 0;
  },
};

// Modifying the content of the userData
userData._id = 32; // this throws an error because '_id' is read only.
userData.email = "dummyTest@dummy.com";
```

###

What is **re-opening of the interface** in TypeScript?

###

We use the same interface as above 'User' and add extra property type 'githubToken'. The use cases/ scenarios would be like
you are just using the interface that is exported and modifying it for special use case.

```ts
interface User {
  readonly _id: number;
  email: string;
  userID?: number;
  showData: () => number;
  showEmail(): string;
  getHike(name: string, percentage: number): number;
}

// REOPENING of the interface
interface User {
  githubToken: string;
}

let userData: User = {
  _id: 2342,
  email: "testDummy@test.com",
  userID: 12,
  showData: () => {
    return 1;
  },
  showEmail: () => {
    return "Email";
  },
  getHike: (name: "annual", percentage: 10) => {
    return 0;
  },
  // ADD NEW PROPERTY WHICH WE CREATED BY REOPENING THE INTERFACE
  githubToken: "12312josfa834r29734rhqer8923jrjs",
};
```

###

What is **Extending of the interface** in TypeScript?

###

We use the same interface as above 'User' to extend all the properties to different type 'Admin'.
In 'Admin' interface we add one new property role.

```ts
interface User {
  readonly _id: number;
  email: string;
  userID?: number;
  showData: () => number;
  showEmail(): string;
  getHike(name: string, percentage: number): number;
}

interface User {
  githubToken: string;
}

// Extending the interface
interface Admin extends User {
  role: "Admin" | "TL" | "Manager";
}

let adminData: Admin = {
  _id: 2342,
  role: "Admin", // Admin interface property
  email: "testDummy@test.com",
  userID: 12,
  showData: () => {
    return 1;
  },
  showEmail: () => {
    return "Email";
  },
  getHike: (name: "annual", percentage: 10) => {
    return 0;
  },
  githubToken: "12312josfa834r29734rhqer8923jrjs",
};
```

###

<br>
<br>
<br>
<br>
<br>

# Advance Concepts in TypeScript

## 'class' in TypeScript

```ts
class User {
  public email: string;
  userID: number;
  city: string = "";
  readonly classID: number = 77;
  private readonly superID: number = 77;

  constructor(email: string, userID: number) {
    this.email = email;
    this.userID = userID;
  }
}

const user = new User("test@test.com", 1001);

user.city = "Jaipur";

user.city = 1000; // this throws an error

user.classID = 37; // this throws an error because classID is read-only

user.superID; // this throws an error because superID is private only accessible in class 'User'
```

**What are 'readonly' and 'private'**

- 'readonly' properties cannot be assigned new value.

- 'private' properties cannot be accessed outside class.

- When property does not have a access modifier ( i.e private ) it means 'public' by default.

###

Similarly we can also have **private method inside class**

```ts
class User {
  email: string;
  userID: number;

  constructor(email: string, userID: number) {
    this.email = email;
    this.userID = userID;
  }

  private getToken = (): void => {
    console.log("Token created");
  };

  deleteToken = (): void => {
    console.log("Token deleted");
  };
}

const user = new User("test@test.com", 1001);

user.getToken; // this throws an error because 'getToken' is private method

user.deleteToken();
```

###

**getter and setter methods in class**

```ts
class User {
  email: string;
  userID: number;

  /*
    private property cannot be accessed outside class but can be accessed inside class.

    We can design a getter & setter methods so that if anyone wants to modify this private property 
    they can do that indirectly

    */
  private courseCount: number = 1;

  constructor(email: string, userID: number) {
    this.email = email;
    this.userID = userID;
  }

  get getMaskedEmail(): string {
    return `${this.email.split("@")[0]}@test.com`;
  }

  get getCourseCount(): number {
    return this.courseCount;
  }

  // setter cannot have return type annotation as well even void
  set setCourseCount(newCourseCount: number): void {
    return this.courseCount; // this throws an error because setter cannot have a return
  }

  // this the write way of writing the setter method
  set setCourseCount(newCourseCount: number) {
    if (newCourseCount < 1) {
      throw new Error("Count cannot be less than 1");
    }
    this.courseCount = newCourseCount;
  }
}

const user = new User("test@test.com", 1001);
```

###

**What is 'protected' access modifier**

```ts
class User {
  email: string;
  userID: number;

  private courseCount: number = 1;

  /*
    'protected' variables are accessible within the class and in the child classes.
    It cannot be accessible outside the parent and child classes.
  */

  protected authorID: number = 100;

  constructor(email: string, userID: number) {
    this.email = email;
    this.userID = userID;
  }

  get getCourseCount(): number {
    return this.courseCount;
  }
}

// Admin class inherits the User class

class Admin extends User {
  // public properties are accessible
  isAdmin: boolean = true;

  // Lets try to access private variable from the User class and try to modify it
  changeCourseCount = () => {
    /*
      this throws an error because Property 'courseCount' is private and only accessible within class 'User'.
    */
    this.courseCount = 10;
  };

  // Lets try to access protected variable from the User class and try to modify it
  changeAuthorID = () => {
    this.authorID = 1000; // it is accessible
  };
}

const user = new User("test@test.com", 1001);
```

###

**Interface for class**

```ts
interface TakePhoto {
  cameraMode: string;
  filter: string;
  burstMode: number;
}

interface Story {
  createStory(): void;
}

class SnapChat implements TakePhoto {} /* 
This throws an error because of the following reasons
  Class SnapChat incorrectly implements interface 
  
  Type is missing the following properties from type:
  - cameraMode
  - filter
  - burstMode
*/

class Instagram implements TakePhoto {
  constructor(
    public cameraMode: string,
    public filter: string,
    public burstMode: number
  ) {}
}

class Youtube implements TakePhoto, Story {
  constructor(
    public cameraMode: string,
    public filter: string,
    public burstMode: number,
    public short: string /* You can have additional properties but it must have all properties 
    defined in interface 'TakePhoto' & 'Story'
    */
  ) {}

  createStory(): void {
    console.log("Story created");
  }
}
```

**Abstract class**

An abstract class is a template definition of methods and variables in a specific class or category of objects. Abstract classes are classes that contain one or more abstracted behaviors or methods.

###

Abstract classes are designed to be specifically used as a base class. They can be considered a blueprint for other classes.

```ts
abstract class TakePhoto {
  constructor(public cameraMode: string, public filter: string) {}

  // lets create a method
  abstract getSepia(): void;
  // this 'getSepia' method should be implemented.
}

const a = new TakePhoto("demo", "demo");
/*
  You cannot create an object for abstract. It acts like a blueprint. 

  You can only create an object from class extending the abstract class.

  Abstract classes help to define the class that is inheriting. it makes sure the methods and properties 
  that are used in abstract classes are implemented. Methods can be overridden as well.
*/

class Instagram extends TakePhoto {
  constructor(
    public cameraMode: string,
    public filter: string,
    public burstMode: number
  ) {
    super(cameraMode, filter);
  }

  getSepia(): void {
    console.log("Sepia");
  }
}

const b = new Instagram("demo", "demo", 5);
/*   
  this is valid since we are implementing 'Instagram' which extends the abstract class 'TakePhoto'.
*/
```

## Difference between Interface & Type
