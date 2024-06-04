import express, { Express, Request } from 'express'

import * as jwt from 'jsonwebtoken'
import cors from 'cors'
import { AuthenticationError, ApolloServer } from 'apollo-server-express'
import schema from './schema'
import { models } from 'mongoose'
import resolvers from './resolvers'

const app: Express = express()

app.use(cors())

const getMe = async (req: Request) => {
	const token = req.headers['x-token'] as string

	if (token) {
		try {
			return jwt.verify(token, process.env.SECRET as string)
		} catch (e) {
			throw new AuthenticationError('Your session expired. Sign in again.')
		}
	}
}

const apolloServer = new ApolloServer({
	introspection: true,
	typeDefs: schema,
	resolvers,
	context: async ({ req }) => {
		const me = await getMe(req)
		return {
			models,
			me,
			secret: process.env.SECRET
		}
	}
})

export { app, apolloServer }
