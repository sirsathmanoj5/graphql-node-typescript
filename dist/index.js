"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const PORT = process.env.PORT || 4000;
const schema = (0, graphql_1.buildSchema)(`
    type Query {
        users: [User]
    }

    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String
        subjects: [String]
    }
`);
const app = (0, express_1.default)();
const root = {
    users: () => {
        const users = [
            {
                id: 1,
                firstName: 'User 1',
                lastName: 'Last Name',
                email: 'user1@gmail.com',
                subjects: ['Marathi', 'English', 'Math']
            },
            {
                id: 2,
                firstName: 'User 2',
                lastName: 'Last Name',
                email: 'user2@gmail.com',
                subjects: ['Marathi', 'English', 'Math']
            }
        ];
        return users;
    },
};
app.use('/graphQL', (0, express_graphql_1.graphqlHTTP)({
    schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:4000/graphQL `);
});
