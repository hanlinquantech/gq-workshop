import { sign, Secret } from 'jsonwebtoken'
import { IAuthUser } from '../interfaces/user-interfaces'
import config from '../config'

export async function findOneOrCreate(condition: any, data: any) {
	// @ts-ignore
	const result = await this.findOne(condition)
	// @ts-ignore
	return result || this.create(data)
}

export function generateAccessToken(data: IAuthUser): string {
	return sign({ data }, config.ACCESS_TOKEN_SECRET as Secret, {
		expiresIn: config.ACCESS_TOKEN_EXPIRED_TIME
	})
}

export function generateRefreshToken(data: IAuthUser): string {
	return sign({ data: { username: data.username } }, config.REFRESH_TOKEN_SECRET as Secret, {
		expiresIn: config.REFRESH_TOKEN_EXPIRED_TIME
	})
}
