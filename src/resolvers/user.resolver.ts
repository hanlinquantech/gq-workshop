import User, { IUser } from '../models/user-model'
import * as jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import { UserInputError } from 'apollo-server'

const createToken = async (user: IUser, secret: any, expiresIn: any) => {
	const { _id, email, username } = user
	return jwt.sign({ _id, email, username }, secret, {
		expiresIn
	})
}

export default {
	Query: {
		users: async () => {
			return User.find()
		},
		user: async (parent: any, { id }: any) => {
			return User.findById(id)
		},

		me: async (parent: any, args: any, { models, me }: any) => {
			if (!me) {
				return null
			}
			return models.User.findById(me.id)
		}
	},
	Mutation: {
		signUp: async (parent: any, { username, email, password }: any) => {
			const secret = process.env.JWT_SECRET as string
			console.log(secret, 'from user.resolver')
			const user = await User.create({
				username,
				email,
				password
			})
			return { token: createToken(user, secret, '30m') }
		},

		signIn: async (parent: any, { login, password }: any, { models, secret }: any) => {
			const user = await models.User.findByLogin(login)

			if (!user) {
				throw new UserInputError('No user found with this login credentials.')
			}

			const isValid = await user.validatePassword(password)

			if (!isValid) {
				throw new AuthenticationError('Invalid password.')
			}

			return { token: createToken(user, secret, '30m') }
		},
		updateUser: async (parent: any, { username, email, password }: any, { models, me }: any) => {
			if (!me) {
				throw new AuthenticationError('You are not authenticated.')
			}
			return models.User.findById(me.id, { username, email, password }, { new: true })
		},
		deleteUser: async (parent: any, { id }: any, { models }: any) => {
			const user = await models.User.findById(id)
			if (user) {
				await user.remove()
				return true
			} else {
				return false
			}
		}
	}
}
