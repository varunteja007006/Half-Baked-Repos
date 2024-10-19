import React from "react";

interface AppContext {
  state: { user: string };
  updateUser: (a: any) => void;
}

export const Context = React.createContext<AppContext>(undefined!);

export type User = {
  username: string;
  roles: Array<string>;
};

// Defined roles
// basic user with either role 'basic' or no roles assigned
export const users: Record<string, User> = {
  basicUser: {
    username: "Hawkeye",
    roles: [],
  },
  ITUser: {
    username: "Tony Stark",
    roles: ["IT"],
  },
  ITAndMarketing: {
    username: "Hulk",
    roles: ["marketing", "IT"],
  },
  superUser: {
    username: "Captain America",
    roles: ["superuser"],
  },
};
