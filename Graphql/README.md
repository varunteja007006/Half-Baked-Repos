# GraphQL

Download the npm packages from Apollo server website

**Test Data**

The data required for this project can be found in `db.json` file.

We can use Json server to host a local server which will be available at "http://localhost:3000"

The data can be accessed via following endpoints:

1. http://localhost:3000/games - get all games

2. http://localhost:3000/games/1 - get game whose id is 1

similarly for other data like authors and reviews.

## Server Setup

```js
// index.js file

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// server setup
const server = new ApolloServer({
  // we need to pass the typeDefs and resolvers
  // typeDefs -- definitions of types of data
  // resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready at port", 4000, url);
```

###

## Schema & Types

What are schema and types in GraphQL?

In GraphQL, schemas and types are fundamental building blocks that define the structure and data representation of a GraphQL API. Schemas act as blueprints for the API, outlining the types of data that can be retrieved and manipulated, while types represent the specific data entities and their characteristics.

**important points**

- int, float, string, boolean, ID.
- using ! to indicate that the data should not be 'null'.
- 'type Query' is must to have, it will help for querying the other types. Used in resolver.

```js
// schema.js file

const typeDefs = `#graphql
type Game {
    id: ID!, 
    title: String!,
    platform: [String!]!
}
type Review{
    id: ID!, 
    rating: Int!,
    content: String!
}
type Author{
    id: ID!, 
    name: String!,
    verified: Boolean!
}
type Query{
    reviews: [Review]
    games:[Game]
    authors:[Author]
}
`;

export default typeDefs;
```

**Different Types in GraphQL**

1. Scalar Types: These represent the most basic data types, such as integers, strings, booleans, and IDs.

2. Object Types: These represent complex data structures, composed of fields that hold values of other types. Object types can be nested within each other to represent hierarchical relationships.

3. Input Types: These define the structure of data that can be passed as arguments to mutations or queries.

4. Enumeration Types: These represent a set of predefined values, similar to enums in programming languages.

5. Union Types: These represent a type that can resolve to one of multiple concrete object types.

6. Interface Types: These define a set of fields that must be implemented by any object type that conforms to the interface.

###

## Resolvers

```js
// index.js file

const resolvers = {
  Query: {
    async games() {
      //return data for games from db
      const resp = await fetch(`http://localhost:3000/games`);
      const games = await resp.json();
      return games;
    },
    async authors() {
      //return data for authors from db
      const resp = await fetch(`http://localhost:3000/authors`);
      const authors = await resp.json();
      return authors;
    },
    async reviews() {
      //return data for reviews from db
      const resp = await fetch(`http://localhost:3000/reviews`);
      const reviews = await resp.json();
      return reviews;
    },
  },
};
```

Now that we have both typeDefs and resolvers, we can add them in the server setup

```js
// update the server setup

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
```

The above resolvers will return all the records for games. authors, reviews.

###

#### How do we request single records?

###

### Single records

```js
// in the schema.js file add these to 'type Query'

review(id: ID!): Review
game(id:ID!):Game
author(id:ID!):Author
```

In the 'type Query' we are mentioning that we can also query single record by passing the 'id' as
argument.
<br />
<br />
'id' is of type 'ID', it cannot be null hence 'ID!'. The result will be single record.

###

```js
// in the index.js file add these in the resolvers.Query object

async review(parent, args, context) {
  const resp = await fetch(`http://localhost:3000/reviews/reviews/${args.id}`);
  const review = await resp.json();
  return review;
},
async game(parent, args, context) {
  const resp = await fetch(`http://localhost:3000/reviews/games/${args.id}`);
  const game = await resp.json();
  return game;
},
async author(parent, args, context) {
  const resp = await fetch(`http://localhost:3000/reviews/authors/${args.id}`);
  const author = await resp.json();
  return author;
},
```

###

## Relationships between types

```js
// in the schema.js file update the typeDefs

type Game {
    id: ID!,
    title: String!,
    platform: [String!]!
    reviews:[Review!]
}
type Review{
    id: ID!,
    rating: Int!,
    content: String!
    game: Game!
    author:Author!
}
type Author{
    id: ID!,
    name: String!,
    verified: Boolean!
    reviews:[Review!]
}

```

```js
// in the index.js file update the resolvers.Query object

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
```

###

## Mutations

### Delete

```js
type Mutation{
    addGame(game:AddGameInput!):Game
    deleteGame(id:ID!): [Game] // add this line
    updateGame(id:ID!,edits:EditGameInput!):Game
}
```

**Explanation**<br />

```js
deleteGame(id:ID!): [Game] // we are creating a mutation in 'type Mutation'

// This mutation will take argument 'id' of type 'ID' which cannot be null hence 'ID!'
// In return this mutation will return all the game records.
```

###

Similarly let us add mutation to update and add records.

### Add

```js
type Mutation{
    addGame(game:AddGameInput!):Game // add this line
    deleteGame(id:ID!): [Game]
    updateGame(id:ID!,edits:EditGameInput!):Game
}
```

### Update

```js
type Mutation{
    addGame(game:AddGameInput!):Game
    deleteGame(id:ID!): [Game]
    updateGame(id:ID!,edits:EditGameInput!):Game // add this line
}
```
