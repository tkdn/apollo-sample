import "reflect-metadata";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typedi";

import { cacheClient } from "./infra/cache/cacheClient";
import { Task } from "./infra/database/entities/Task";
import { User } from "./infra/database/entities/User";

useContainer(Container);

const RedisStore = connectRedis(session);
const sessionHandler = session({
    name: "_session",
    secret: "cat",
    saveUninitialized: false,
    resave: false,
    // @ts-ignore
    store: new RedisStore({ client: cacheClient }),
    cookie: {
        domain: "localhost",
        maxAge: 60 * 60 * 1000,
        sameSite: "lax",
        secure: false
    }
});

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

    const { resolvers, typeDefs } = require("./adaptor/resolvers");
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}: {req: express.Request}) => {
            return { req };
        },
        tracing: true
    });

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log("server online");
    });
};

startServer();
