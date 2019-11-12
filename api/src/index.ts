import "reflect-metadata";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { ApolloServer, gql } from "apollo-server-express";
import { createConnection, getRepository } from "typeorm";
import { pipeResolvers } from "graphql-resolvers";

import { Task } from "./entities/Task";
import { User } from "./entities/User";

const RedisStore = connectRedis(session);
const redisClient = new Redis();

const sessionHandler = session({
    name: "_session",
    secret: "cat",
    saveUninitialized: false,
    resave: false,
    // @ts-ignore
    store: new RedisStore({ client: redisClient }),
    cookie: {
        domain: "localhost",
        maxAge: 60 * 60 * 1000,
        sameSite: "lax",
        secure: false
    }
});

const typeDefs = gql`
type Task {
    id: ID
    userId: ID
    overview: String
    priority: Int
    deadline: String
}
type Query {
    hello: [Task]
}
`;

const pipe = (_root: any, _args: any, ctx: any) => {
    ctx.some = "ワッフル";
    return ctx.some;
    // return new Error("waffle");
};

const helloResolver = async (
    _root: any,
    _args: any,
    ctx: {req: express.Request, some: string}
) => {
    console.log(ctx.some);
    ctx.req.session!.user = {
        name: "John"
    };
    const taskRepo = getRepository(Task);
    const userRepo = getRepository(User);
    const list = await taskRepo.find();
    const [user] = await userRepo.findByIds([1]);
    console.log(user);
    return list;
};

const hello = pipeResolvers(pipe, helloResolver);

const resolvers = {
    Query: { hello }
};

const context = ({req}: {req: express.Request}) => {
    return { req };
};

const startServer = async () => {
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "test",
        database: "test_db",
        entities: [Task, User],
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
