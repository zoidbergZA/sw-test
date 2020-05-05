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
    films: [Film]!
  }

  type Character {
    id: ID!
    name: String!
    birthYear: String
    films: [Film]!
    species: [Species]!
    mass: Float
    height: Int
    homeworld: Planet
    image: String
  }

  type Planet {
    id: ID!
    name: String
  }

  input SpeciesFilter {
    films_some: String
  }

  input CharacterFilter {
    id: String
    films_some: String
    species_some: String
  }

  type Query {
    films: [Film]
    species(filter: SpeciesFilter): [Species]
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
