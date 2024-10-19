"use client";
import React from "react";

import { Context, users } from "@/utils/utils";
import withRole from "@/utils/withRole";

const NotFound = () => <h1>404 Not Found </h1>;

// DENYING ROUTES
const withITRole = withRole(["IT"]);

console.log(withITRole);

const ITContactRoute = withITRole(() => {
  return (
    <div className="border p-3">
      IT Guy
      <div className="p-2 bg-black text-green-500">
        `Hacker stuff goes here.....🤣🤣🤣`
      </div>
    </div>
  );
}, NotFound);

const MarketingView = withRole(["marketing"])(() => (
  <h1>Welcome Marketing Manager</h1>
));

const DeleteButton = withRole(["superuser"])((props) => {
  const { onClick } = props;

  return (
    <button
      className="bg-red-500 py-2 px-4 hover:bg-red-500/[0.9]"
      onClick={onClick}
    >
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
      <h1>Welcome {users[user].username} !!</h1>
      {users[user].roles?.length > 0 && (
        <p>
          You have following roles{" "}
          <span className="font-semibold uppercase bg-green-900 p-2">
            {users[user].roles?.join(", ")}
          </span>
        </p>
      )}
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
      <h1 className="text-2xl font-bold">
        Role based access using wrapper components
      </h1>

      <ToggleUser />

      <Dashboard />

      <ContactPage />

      <ITContactRoute />
    </Context.Provider>
  );
}
