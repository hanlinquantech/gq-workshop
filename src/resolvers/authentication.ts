import { AuthenticationError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'
export const isAuthenticated = (parent: any, args: any, { me }: any) => {
	if (!me) {
		throw new AuthenticationError('You are not authenticated')
	}
	return skip
}
