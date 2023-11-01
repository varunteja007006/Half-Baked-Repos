type User = {
  username: string;
  paymentID: number;
  email: string;
};

function processUser(user: User): User {
  return { ...user }; // this function should also return the type 'User'
}

processUser({
  username: "strongTitan",
  paymentID: 43434,
  email: "strongTitan@test.com",
  // test: "", // This will throw an error since this property is not available in type "User"
});

export {};
