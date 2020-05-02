import { ApolloServer, gql } from 'apollo-server';
import { resolvers } from './resolvers';

// Schema
const typeDefs = gql`
  type Film {
    id: ID!
    title: String!
  }

  type Species {
    id: ID!
    name: String!
  }

  type Character {
    id: ID!
    name: String!
    films: [Film]!
    species: [Species]!
    image: String
  }

  input CharacterFilter {
    id: String
    films_some: String
    species_some: String
  }

  type Query {
    films: [Film]
    species: [Species]
    characters(filter: CharacterFilter): [Character]
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
}).catch(error => {
  console.log(error)
});