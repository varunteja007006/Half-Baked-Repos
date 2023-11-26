## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

### When to use the useSearchParams() hook vs. the searchParams prop?

You might have noticed you used two different ways to extract search params. Whether you use one or the other depends on whether you're working on the client or the server.

<Search> is a Client Component, so you used the useSearchParams() hook to access the params from the client.

<Table> is a Server Component that fetches its own data, so you can pass the searchParams prop from the page to the component.
As a general rule, if you want to read the params from the client, use the useSearchParams() hook as this avoids having to go back to the server.


Email: user@nextmail.com
Password: 123456