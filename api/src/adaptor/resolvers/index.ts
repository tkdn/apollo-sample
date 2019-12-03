import { gql } from "apollo-server-express";
import { hoge } from "./hoge";
import { task } from "./task";
import { user } from "./user";
import {addTask} from "./addTask";

const Query = {
    hoge,
    task,
    user
};

const Mutation = {
    addTask
};

export const resolvers = { Query, Mutation };

export const typeDefs = gql`
type User {
    id: Int!
    hashedUid: String!
    task: [Task!]!
}
type Task {
    id: ID!
    userId: Int!
    overview: String!
    priority: Int!
    deadline: String!
    user: User
}
type Hoge {
    foo: String!
    bar: Int!
}
type Query {
    task: [Task!]!
    user: [User!]!
    hoge: Hoge!
}
type Mutation {
    addTask(
        userId: Int!
        overview: String!
        priority: Int!
        deadline: String!
    ): Task!
}
`;
