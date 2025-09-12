# Practice React Next

This repo is my portfolio 😁 as well as a place to experiment 🥸 with different React libraries.

Check it out here : https://varunteja007006.netlify.app/

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## List of helpful Packages

- Tanstack Query
- Tanstack Table
- Tanstack Virtualization
- Zod
- Validator
- Zustand
- useHooks
- lodash
- React Slick
- Scroll - lock
- React Just Parallax
- React Spring - For making animations
- React Remotion - For making programmatic videos
- Anime js - Animations

## Some Good Blogs

- [React Custom Hooks](https://dev.to/arafat4693/15-useful-react-custom-hooks-that-you-can-use-in-any-project-2ll8)

<br>

###

## NEXT JS

#### Best Practices

- Protected Routes

- Middleware (middleware is a function that runs before the request is handled, it can be used to check for authentication and Authorization)

- Protect the server actions

- Static vs Dynamic Rendering (Static Rendering is faster than Dynamic Rendering)

- Authorization check before making db calls in the server actions

- Create a **DAL (Data Access Layer)** this will help you organize the code for all the API calls that require db connection and valid authentication and Authorization checks.

#### Topic to prepare

https://www.youtube.com/watch?v=vwSlYG7hFk0

1. Client vs Server Components (GET - Requests)
2. Server actions (POST/PUT/DELETE)
3. Suspense and Streaming
4. Caching
5. Static and Dynamic Rendering
6. Middleware
7. Folder/ File Structure
8. Production Build and deploying

---

###

1. A server component inside a client component will become a client only component. It also requires
   you to check and make sure that server component is not imported in client.

```js
"use client";
import ServerComp from "@serverComp/ServerComp";

function ClientComp() {
  // --- Some logic ---
  return (
    <>
      <ServerComp /> {/*This is also a client component now*/}
    </>
  );
}
export default ClientComp;
```

This is not the case if the client only component wraps the server component(server component is children)
or takes the server component as a props.

#### Passing server only component as a props to client only component

```js
// file name - ClientComp
"use client";

function ClientComp({ ServerComp }) {
  // --- Some logic ---
  return (
    <>
      {ServerComp} {/*This is a server component now*/}
    </>
  );
}
export default clientComp;
```

```js
// file name - ServerComp
import ClientComp from "@/ClientComp/ClientComp";
import ServerComp from "@/ServerComp/ServerComp";

async function Main() {
  // --- Some logic ---
  return (
    <>
      <ClientComp ServerComp={<ServerComp />} />{" "}
      {/* Pass the server component as props to client
      
      This will make sure Server Components will be server only component*/}
    </>
  );
}
export default Main;
```

<br />

#### Passing server only component as a children to client only component

```js
// file name - ClientComp
"use client";

function ClientComp({ children }) {
  // --- Some logic ---
  return (
    <>
      <div>
        {children} {/*This is a server component now*/}
      </div>
    </>
  );
}
export default clientComp;
```

```js
// file name - ServerComp
import ClientComp from "@/ClientComp/ClientComp";
import ServerComp from "@/ServerComp/ServerComp";

async function Main() {
  // --- Some logic ---
  return (
    <>
      {/* Pass the server component as children to client only component      
      This will make sure Server Components will be server only component*/}
      <ClientComp>
        <ServerComp />
      </ClientComp>
    </>
  );
}
export default Main;
```

2. A client only component can become server component

3. Server component is run once on server. A client component is run once on server and then hydrated
   in the browser(run on the client again).
   Therefore try not to access any window objects in client component assuming that it will run only
   on the browser.
   Best Practice:

   ```js
   if (typeof window !== "undefined") {
     // access window objects
     window.localStorage.setItem("Hello", "World");
   }
   ```

   Another solution is to use dynamic import to import the client side component

   ```js
   const ClientComponent = dynamic(
     () => import("@/ClientComponent/ClientComponent"),
     {
       ssr: false,
     }
   );
   ```

4. Hydration Errors - When the HTML rendered on the server does not match the HTML rendered on the
   client we get hydration errors. You could suppress it by passing suppressHydrationWarning prop
   to HTML tag.
   Example:

   ```js
   // Imports here ...
   function Example() {
     let isMsg;
     if (typeof window !== "undefined") {
       isMsg = JSON.parse(localStorage.getItem("message")); // assuming we get 'true' from storage
     }
     return (
       <>
         <h1> {message ? "Client" : "Server"} </h1>
         {/*On the server HTML will render "Server" but on the browser it will render "Client"
          This will result in hydration error
          */}
         <h1 suppressHydrationWarning> {message ? "Client" : "Server"} </h1>
         {/*This will not throw hydration error*/}
       </>
     );
   }
   ```

5. Fetching data

   - Server Components = You can directly call GET APIs in the server component itself.
   - Server Actions = POST PUT DELETE
   - Route Handlers = Webhooks (3rd Party libraries)

6. Use 'use server' to make something a server action, but not to make a component server component.
   To make component server component you can import "server-only" (NPM package).
   NOTE: In Next JS by default a component in app dir is a server component.

7. You can use server actions to post the data of the form by using the server action in the form action.
   You can also use React hooks to do advance form handling. Use 'use server' to make an API as server action

8. Data mutations do not reflect immediately in the server components because of caching. To make sure
   latest data is served when server component loads we have to use revalidatePath.
   You have to pass the path for which you want to revalidate the cache.
   NOTE: If you pass path "/" then it will revalidate the cache for all the server components. Try to
   specify particular paths.

9. Server Actions can be used for client side as well

10. params & searchParams

    - Params = like a specific product. Example URL: www.test.com/products/:id
    - Search Params = like a query or filter params. Example URL: www.test.com/products?sortBy=${value}

11. Forgetting about the loading state

    - Using suspense use the file `loading.tsx`

12. Using key in Suspense to trigger the loading whenever a component changes.

13. Using cookies() , headers() will make a file dynamic rendering. Also using searchParams will make
    a file dynamic rendering.

    Always run a build to check which parts of the component are static and dynamic rendering for better
    optimized build

14. In env files. env variables should be named with prefix NEXT_PUBLIC if it has to be used on the
    client side. If it has to be used on server side do not use it with that prefix NEXT_PUBLIC.

15. Split the utility functions like server side fetch calls with API key should be kept in different
    file when compared to Client API key that should run only on Client side.

16. Try Catch - Redirect  
    Use the redirection to navigate the user if some dynamic data is not available. Redirection logic
    should be used after the try catch

---

###

 <br />

###

header in next js

```js
import { Suspense } from "react";
import { headers } from "next/headers";

async function User() {
  const authorization = headers().get("authorization");
  const res = await fetch("...", {
    headers: { authorization }, // Forward the authorization header
  });
  const user = await res.json();

  return <h1>{user.name}</h1>;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <User />
    </Suspense>
  );
}
```

```js
import { Suspense } from "react";
import { headers } from "next/headers";

async function User() {
  const authorization = headers().get("authorization");
  const res = await fetch("...", {
    headers: { authorization }, // Forward the authorization header
  });
  const user = await res.json();

  return <h1>{user.name}</h1>;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <User />
    </Suspense>
  );
}
```

<br>

###

#### ShadCN UI extensions

https://jidefr.medium.com/shadcn-ui-add-components-and-resources-0846b0f57596

https://github.com/birobirobiro/awesome-shadcn-ui?tab=readme-ov-file

https://awesome-shadcn-ui.vercel.app/
