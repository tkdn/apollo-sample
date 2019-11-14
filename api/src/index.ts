import "reflect-metadata";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { ApolloServer, gql, ApolloError } from "apollo-server-express";
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
type User {
    id: Int
    hashedUid: String
    task: [Task]
}
type Task {
    id: ID
    userId: Int
    overview: String
    priority: Int
    deadline: String
    user: User
}
type Hoge {
    foo: String
    bar: Int
}
type Query {
    task: [Task]
    user: [User]
    hoge: Hoge
}
`;

const pipe = () => {
    const some = "ワッフル";
    return new ApolloError(some);
    // return some;
};

const hoge = () => ({foo: "foo", bar: 1});

const user = async (
    _root: any,
    // _args: any,
    // ctx: {req: express.Request}
) => {
    console.log(_root);
    const userRepo = getRepository(User);
    const users = userRepo.find();
    // const [user] = await userRepo.findByIds([1]);
    return users;
};

const taskResolver = async (
    // _root: any,
    // _args: any,
    // ctx: {req: express.Request}
) => {
    // console.log(_root);
    // ctx.req.session!.user = {
    //     name: "John"
    // };
    const taskRepo = getRepository(Task);
    const tasks = await taskRepo.find();
    const userRepo = getRepository(User);
    return tasks.map(async (task) => {
        const [user] = await userRepo.findByIds([task.userId]);
        return {
            ...task,
            user
        };
    });
};

const task = pipeResolvers(pipe, taskResolver);

const resolvers = {
    Query: {
        task,
        user,
        hoge
    }
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

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
        tracing: true
    });

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log("server online");
    });
};

startServer();
