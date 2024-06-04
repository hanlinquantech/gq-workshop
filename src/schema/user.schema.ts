import { gql } from 'apollo-server-express'

export default gql`
	type Token {
		token: String!
	}

	type User {
		id: ID!
		username: String!
		email: String!
	}

	extend type Query {
		users: [User!]
		user(id: ID!): User
		me: User
	}

	extend type Mutation {
		signUp(username: String!, email: String!, password: String!): Token
		signIn(login: String!, password: String!): Token
		updateUser(username: String!, email: String!, password: String!): User
		deleteUser(id: ID!): Boolean
	}
`
