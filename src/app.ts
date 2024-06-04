import express, { Express } from 'express'

// import * as jwt from 'jsonwebtoken'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'

const app: Express = express()

app.use(cors())

// const getMe = async (req: Request) => {
// 	const token = req.headers['x-token'] as string
//
// 	if (token) {
// 		try {
// 			return jwt.verify(token, process.env.SECRET as string)
// 		} catch (e) {
// 			throw new AuthenticationError('Your session expired. Sign in again.')
// 		}
// 	}
// }

const apolloServer = new ApolloServer({
	introspection: true,
	typeDefs: schema,
	resolvers
	// context: async ({ req }) => {
	// 	const me = await getMe(req)
	// 	console.log(process.env.SECRET, 'form app.ts')
	// 	return {
	// 		models,
	// 		me,
	// 		secret: process.env.SECRET
	// 	}
	// }
})

export { app, apolloServer }
