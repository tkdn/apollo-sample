import "reflect-metadata";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { ApolloServer, gql } from "apollo-server-express";
import { createConnection, getRepository } from "typeorm";
import { Task } from "./entities/Task";

const RedisStore = connectRedis(session);
const redisClient = new Redis();

const sessionHandler = session({
    secret: "cat",
    saveUninitialized: false,
    resave: false,
    // @ts-ignore
    store: new RedisStore({ client: redisClient }),
    cookie: {
        secure: false
    }
});

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

const helloResolver = async (_root: any, _args: any, ctx: {req: express.Request}) => {
    // @ts-ignore
    ctx.req.session.user = {
        name: "John"
    };
    const taskRepo = getRepository(Task);
    const list = await taskRepo.find();
    return list;
};

const resolvers = {
    Query: {
        hello: helloResolver
    }
};

const context = (request: {req: express.Request}) => {
    return {
        req: request.req,
    };
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
    app.use(sessionHandler);
    const server = new ApolloServer({ typeDefs, resolvers, context });

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log("server online");
    });
};

startServer();
