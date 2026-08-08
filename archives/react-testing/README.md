# Demo

## Run React App

#### Install the npm dependencies

```sh
npm install
```

#### Run the local server

```sh
npm run dev
```

<br />

## Setup the testing environment

#### Install Vitest for Vite

```sh
npm install -D vitest
```

In the package.json file

```js
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest"  // add this line
},
```

Create a config file. You can create a new file `vitest.config.ts` but it will overwrite the `vite.config.ts` hence we need to merge both.
<br />

```ts
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts"; // path to vite.config.ts file if you have it

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {},
  })
);
```

[_**Recommended**: to maintain only one file, either `vite.config.ts` or `vitest.config.ts`_]

<br />

### Create test file for App.tsx

Create App.test.tsx file

```ts
import { describe, test } from "vitest";
import App from "./App";

describe("App test", () => {
  test("Check the heading", () => {
    render(<App></App>); // this throws an error, ReferenceError: render is not defined
  });
});
```

This is because we do not have a library to handle the DOM elements.

#### Testing Libraries for DOM elements testing

DOM manipulation specifically for the React requires additional library, install it.

```sh
npm install --save-dev @testing-library/react
```

Install jsdom for accessing the DOM elements. It is a browser DOM (Document Object Model) implementation that runs in Node.js

```sh
npm i jsdom
```

https://testing-library.com/docs/ecosystem-jest-dom/

Install jest-dom from Testing Library, modules required to extend the jest library to test DOM.

```sh
npm install --save-dev @testing-library/jest-dom
```

Create a `setup.ts` file and add the below line

```ts
import "@testing-library/jest-dom";
```

Okay, so let us now let vitest/vite know that it has to extend the jest library with jest-dom

Now let us refer this file in `vitest.config.ts`

```ts
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts"; // path to vite.config.ts file if you have it

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom", // environment is not simple js but jsdom
      setupFiles: ["./setup.ts"], // path to the created setup.ts file
    },
  })
);
```

Now lets run the command `npm run test`

It worked 🥺, the test cases run and passed.

now let us add more code to `App.test.tsx`

```ts
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App test", () => {
  test("Check the heading", () => {
    render(<App></App>);
    const titleElem = screen.getByRole("heading");
    expect(titleElem).toBeInTheDocument(); // why does typescript highlight but our test cases still pass 🤔
  });
});
```

This is because TypeScript cannot recognize the `.toBeInTheDocument()` method. This method is available from the `testing-library/jest-dom`. If you remember we created a `setup.ts` file for importing this library. Therefore in-order to let TypeScript recognize this library we have to modify the `tsconfig.json` file

<br />

Search for `"include"` in tsconfig.json file and add `setup.ts` file path in that array.

```js
"include": ["src", "./setup.ts"],
```

### User Interactions

user-event package helps simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.

Install npm package.

```sh
npm install --save-dev @testing-library/user-event
```

<br />
Finally let us also try to understand the simple test case created.

## Understanding App.test.tsx

-- Pending content --

<br />

## Additional Configuration

### Vitest UI (**Optional**)

You can also get Vitest dev server.

```sh
npm i -D @vitest/ui
```

In the package.json file

```js
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest --ui"  // modify this line
},
```

### Vitest coverage

https://vitest.dev/guide/coverage

Vitest supports Native code coverage via v8 and instrumented code coverage via istanbul.

Which one to choose? I asked Bard(Google Gen AI) here's what it said....

    Choosing between Native and Instrumented Coverage:
    The best choice for your project depends on your specific needs and priorities:
    -> If you need accurate line-by-line coverage and prioritize performance, native code coverage is a good option.
    -> If you need detailed coverage information for lines, branches, and functions, or need wider browser support, instrumented code coverage is a better choice.

    You can even use a combination of both approaches:
    -> Use native code coverage for initial testing to identify areas with low coverage.
    -> Use instrumented code coverage for deeper analysis and detailed insights into code execution.

<br />

Installing `v8` coverage

```sh
npm i -D @vitest/coverage-v8
```

Update the `vitest.config.ts`

```js
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./setup.ts"],
      // add the below code --start
      coverage: {
        provider: "v8", // or 'istanbul'
      },
      // ---end
    },
  })
);
```

Update the `"scripts"` in `package.json` file as shown below.

```js
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest --ui",
    "coverage": "vitest run --coverage" // add this line
  },
```

Additionally if you want to enable **Vitest UI** for the coverage then,

Update the `"scripts"` in `package.json` file as shown below.

```js
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest --ui --coverage.enabled=true", // update this line
    "coverage": "vitest run --coverage"
  },
```

Also update the `vitest.config.ts` file.

```ts
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./setup.ts"],
      coverage: {
        provider: "v8", // or 'istanbul'
        reporter: ["text", "json", "html"], // add this line to enable the Vitest UI for coverage
      },
    },
  })
);
```
