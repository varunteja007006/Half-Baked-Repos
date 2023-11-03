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

export {};

// 1:45:47
