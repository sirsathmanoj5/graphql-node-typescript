import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const PORT = process.env.PORT || 4000;

const schema = buildSchema(`
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

const app = express();

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
        ]
        return users;
    },
};

app.use('/graphQL', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:4000/graphQL `);
})


