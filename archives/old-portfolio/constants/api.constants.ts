export const fakeAPI = `https://jsonplaceholder.typicode.com/posts`;

const localAPI =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV"
    ? "http://localhost:3030"
    : `https://jsonplaceholder.typicode.com`;

export { localAPI };
