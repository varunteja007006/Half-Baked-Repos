"use client";
import React from "react";
import defineRulesFor from "@/utils/config";
import { Context, users } from "@/utils/utils";
import Can from "@/components/Can";

const NotFound = () => <h1>404 Not Found </h1>;

const Contact = () => <h1>Welcome to the Contact page</h1>;

const MarketingView = () => <h1>Welcome Marketing Guru, You have access</h1>;

const DeleteButton = (props: any) => {
  const { onClick } = props;

  return (
    <button className="deleteButton" onClick={onClick}>
      Delete Database
    </button>
  );
};

const ToggleUser = () => {
  return (
    <Context.Consumer>
      {(context) => {
        return (
          <select
            className="p-4 rounded-md w-96 text-black"
            value={context.state.user}
            onChange={(e) => context.updateUser(e.target.value)}
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
};

const Dashboard = () => {
  const context = React.useContext(Context);
  const user = context.state.user as keyof typeof users;
  return (
    <>
      <ToggleUser />

      <Can action="read" subject="MarketingView">
        <MarketingView />
      </Can>

      <h1>Welcome to Home: {users[user].username}</h1>

      <Can action="delete" subject="Database">
        <DeleteButton onClick={() => alert("database dropped")} />
      </Can>

      <Contact />
    </>
  );
};

export default function Home() {
  const [user, setUser] = React.useState<string>("ITUser");
  defineRulesFor(user);

  const obj = React.useMemo(() => {
    return {
      state: { user },
      updateUser: (a: string) => setUser(a),
    };
  }, [user]);

  return (
    <Context.Provider value={obj}>
      <Dashboard />
    </Context.Provider>
  );
}
