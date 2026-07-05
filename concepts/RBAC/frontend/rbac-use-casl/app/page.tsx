import React from "react";

import Can, { AbilityContext } from "@/components/Can";
import { Context, users } from "@/utils/utils";
import defineRulesFor, { buildAbilityFor } from "@/utils/config";

const NotFound = () => <h1>404 Not Found </h1>;

const MarketingView = () => <h1>Welcome Marketing Guru, You have access</h1>;

const DeleteButton = (props: any) => {
  const { onClick } = props;

  return (
    <button className="deleteButton" onClick={onClick}>
      Delete Database
    </button>
  );
};

// Has access to edit entity
const proposal = {
  name: "My sample Proposal",
  budget: 5000,
  user: "Mary",
};

const Contact = () => <h1>Welcome to the Contact page</h1>;

function ToggleUser() {
  const context = React.useContext(Context);
  const abilityContext = React.useContext(AbilityContext);

  const updateUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    context.updateUser(e.target.value);

    // update user roles when user changes / updates
    const user = users[e.target.value];
    abilityContext.update(defineRulesFor(user));
  };

  return (
    <select value={context.state.user} onChange={updateUser}>
      {Object.keys(users).map((u) => (
        <option key={u}>{u}</option>
      ))}
    </select>
  );
}

const Dashboard = () => {
  const context = React.useContext(Context);
  const user = context.state.user;
  const abilityContext = React.useContext(AbilityContext);

  return (
    <>
      <ToggleUser />

      <Can do="read" on="MarketingView">
        <MarketingView />
      </Can>

      <h1>Welcome to Home: {users[user].username}</h1>

      <Can I="delete" a="Database">
        <DeleteButton onClick={() => alert("database dropped")} />
      </Can>

      {abilityContext.can("read", "Contact") && <Contact />}

      {/* @ts-ignore */}
      <Can I="read" this={subject("Proposal", proposal)}>
        <h1>Proposal Details</h1>
        <p>name: {proposal.name}</p>
        <p>owner: {proposal.user}</p>
      </Can>
    </>
  );
};

// MAIN application
// begin with empty abilities
const ability = buildAbilityFor({ username: "default", roles: [] });

export default function Home() {
  const [user, setUser] = React.useState<string>("basicUser");

  const obj = React.useMemo(() => {
    return {
      state: { user },
      updateUser: (a: string) => setUser(a),
    };
  }, [user]);

  return (
    <Context.Provider value={obj}>
      {" "}
      <AbilityContext.Provider value={ability}>
        <Dashboard />{" "}
      </AbilityContext.Provider>
    </Context.Provider>
  );
}
