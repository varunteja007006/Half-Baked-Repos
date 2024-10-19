// ! WARNING : Do not modify the ./basic_policy.csv file

import express from "express";
import fs from "fs";
const app = express();
const port = 4040;

import { newEnforcer } from "casbin";

const e = await newEnforcer("./basic_model.conf", "./basic_policy.csv");

console.warn(`\n\nWARNING : Do not modify the ./basic_policy.csv file\n`);

console.log(
  "Does Alice have read access?",
  await e.enforce("alice", "data1", "read")
);
console.log(
  "Does Alice have write access?",
  await e.enforce("alice", "data1", "write")
);

// Load user data from JSON file
let users = [];
try {
  users = JSON.parse(fs.readFileSync("users.json", "utf8"));
} catch (err) {
  console.error("Error reading users.json:", err);
}

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to create a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(users));
  res.status(201).json(newUser);
});

// Endpoint to update an existing user by ID
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = updatedUser;
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Endpoint to view a single user by ID
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Endpoint to view a single user by ID
app.get("/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "No users found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
