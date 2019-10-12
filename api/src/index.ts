import "reflect-metadata";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { createConnection, getRepository } from "typeorm";
import { Task } from "./entities/Task";

function hoge () {
    return 1;
}

const typeDefs = gql`
type Task {
    id: ID
    overview: String
    priority: Int
    deadline: String
}
type Query {
    hello: [Task]
}
`;

const resolvers = {
    Query: {
        async hello() {
            const taskRepo = getRepository(Task);
            const list = await taskRepo.find();
            return list;
        }
    }
};

const startServer = async () => {
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "test",
        database: "test_db",
        entities: [Task],
    });

    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log("server online");
    });
};

startServer();
