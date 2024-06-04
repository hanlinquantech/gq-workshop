import { IUser } from '../models/user-model'
import * as jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import { UserInputError } from 'apollo-server'

const createToken = async (user: IUser, secret: any, expiresIn: any) => {
	return jwt.sign({ id: user._id.toString(), email: user.email, username: user.username }, secret, {
		expiresIn
	})
}

export default {
	Query: {
		users: async (parent: any, args: any, { models }: any) => {
			return models.User.find()
		},
		user: async (parent: any, { id }: any, { models }: any) => {
			return models.User.findById(id)
		},

		me: async (parent: any, args: any, { models, me }: any) => {
			if (!me) {
				return null
			}
			return models.User.findById(me.id)
		}
	},
	Mutation: {
		signUp: async (parent: any, { username, email, password }: any, { models, secret }: any) => {
			const user = await models.User.create({
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
