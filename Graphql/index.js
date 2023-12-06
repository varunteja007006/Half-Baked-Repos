import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { v4 as uuidv4 } from "uuid";

import typeDefs from "./schema.js";

import { getData } from "./fetchAPI.js";
// import { games, authors, reviews } from "./_db.js";

const URL = "http://localhost:3000";

const resolvers = {
  Query: {
    async games() {
      const games = await getData("/games");
      return games;
    },
    async authors() {
      const resp = await fetch(`${URL}/authors`);
      const authors = await resp.json();
      return authors;
    },
    async reviews() {
      const resp = await fetch(`${URL}/reviews`);
      const reviews = await resp.json();
      return reviews;
    },
    // return single items
    async review(parent, args, context) {
      const resp = await fetch(`${URL}/reviews/${args.id}`);
      const review = await resp.json();
      return review;
    },
    async game(parent, args, context) {
      const resp = await fetch(`${URL}/games/${args.id}`);
      const game = await resp.json();
      return game;
    },
    async author(parent, args, context) {
      const resp = await fetch(`${URL}/authors/${args.id}`);
      const author = await resp.json();
      return author;
    },
  },
  // return nested items
  Game: {
    reviews(parent) {
      return reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return games.find((game) => game.id === parent.game_id);
    },
  },
  // doing POST/ UPDATE/ DELETE
  Mutation: {
    // delete game mutation
    async deleteGame(parent, args) {
      await fetch(`${URL}/games/${args.id}`, {
        method: "DELETE",
      });
      const resp = await fetch(`${URL}/games`);
      const games = await resp.json();
      return games;
    },

    // add game mutation
    async addGame(parent, args) {
      const game = {
        id: uuidv4(),
        ...args.game,
      };
      const resp = await fetch(`${URL}/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
      const data = await resp.json();
      return data;
    },

    // update game mutation
    async updateGame(parent, args) {
      const game = {
        ...args.edits,
      };
      const resp = await fetch(`${URL}/games/${args.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
      const data = await resp.json();
      return data;
    },
  },
};

// server setup
const server = new ApolloServer({
  // typeDefs -- definitions of types of data
  typeDefs,
  // resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready at port", 4000, url);
