import cors from 'cors';

const mongoose = require('mongoose');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema').typeDefs
const resolvers = require('./schema').resolvers

require('dotenv').config()

async function startApolloServer() {
      
      const uri = process.env.URI;
      
      mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
      const connection = mongoose.connection;
      connection.once('open', () => {
            console.log("🚀 MongoDB database connection established successfully!");
      })

      const server = new ApolloServer({ typeDefs, resolvers });
      await server.start();

      const app = express();

      app.use(cors());
      server.applyMiddleware({ app });

      await new Promise((resolve: any) => app.listen({ port: 4000 }, resolve));
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

      return { server, app };
}

startApolloServer();