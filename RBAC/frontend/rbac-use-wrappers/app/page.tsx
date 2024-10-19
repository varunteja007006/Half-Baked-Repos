"use client";
import React from "react";

import { Context, users } from "@/utils/utils";
import withRole from "@/utils/withRole";

const NotFound = () => <h1>404 Not Found </h1>;

// DENYING ROUTES
const withITRole = withRole(["IT"]);

console.log(withITRole);

const ITContactRoute = withITRole(() => {
  return <>IT Guy</>;
}, NotFound);

const MarketingView = withRole(["marketing"])(() => (
  <h1>Welcome Marketing Guru, You have access</h1>
));

const DeleteButton = withRole(["superuser"])((props) => {
  const { onClick } = props;

  return (
    <button className="deleteButton" onClick={onClick}>
      Delete Database
    </button>
  );
});

function Dashboard() {
  const context = React.useContext(Context);
  const user = context.state.user as keyof typeof users;
  return (
    <>
      <MarketingView />
      <h1>Welcome to Home: {users[user].username}</h1>
      <DeleteButton onClick={() => alert("database dropped")} />
    </>
  );
}

function ContactPage() {
  return (
    <div className="text-center border p-4">
      <div>Welcome to the Contact page</div>
    </div>
  );
}

function ToggleUser() {
  return (
    <Context.Consumer>
      {(context) => {
        const updateUser = (e: React.ChangeEvent<HTMLSelectElement>) =>
          context.updateUser(e.target.value);

        return (
          <select
            className="w-96 text-black p-4 rounded-md"
            value={context.state.user}
            onChange={updateUser}
          >
            {Object.keys(users).map((u) => (
              <option className="text-black p-2" key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        );
      }}
    </Context.Consumer>
  );
}

export default function HomePage() {
  const [user, setUser] = React.useState<string>("basicUser");

  return (
    <Context.Provider
      value={{
        state: { user },
        updateUser: (a) => setUser(a),
      }}
    >
      <ToggleUser />

      <Dashboard />

      <ContactPage />

      <ITContactRoute />
    </Context.Provider>
  );
}
