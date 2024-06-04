import { Document, model, Schema } from 'mongoose'
import { compare, hash } from 'bcrypt'

export interface IUser extends Document {
	username: string
	email: string
	password: string
	generatePasswordHash(): Promise<string>
	validatePassword(password: string): Promise<boolean>
}
const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true }
})

userSchema.statics.findByLogin = async function (login: string) {
	let user = await this.findOne({
		username: login
	})
	if (!user) {
		user = await this.findOne({ email: login })
	}
	return user
}

userSchema.methods.generatePasswordHash = async function () {
	const saltRounds = 10
	return hash(this.password, saltRounds)
}

userSchema.methods.validatePassword = async function (password: string) {
	return compare(password, this.password)
}

userSchema.pre('save', async function () {
	if (this.isModified('password')) {
		this.password = await this.generatePasswordHash()
	}
})

const User = model<IUser>('User', userSchema)

export default User
