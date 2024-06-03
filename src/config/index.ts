import 'dotenv/config'

export default {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	MONGO_URL: process.env.MONGO_DB_URL,
	LOG_DIR: process.env.LOG_DIR,
	LOG_FILE_SIZE: process.env.LOG_FILE_SIZE,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || null,
	ACCESS_TOKEN_EXPIRED_TIME: process.env.ACCESS_TOKEN_EXPIRED_TIME,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRED_TIME: process.env.REFRESH_TOKEN_EXPIRED_TIME
}
