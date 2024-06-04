import http from 'http'
import { app, apolloServer } from './app'
import { DEFAULT_PORT, TEN, ZERO } from './utils/constants'
import './mongoose'
function normalizePort(val: string): number {
	const port = parseInt(val, TEN)

	if (Number.isNaN(port)) return NaN

	if (port >= ZERO) return port

	return NaN
}

const port = normalizePort(process.env.PORT || DEFAULT_PORT)

const server = http.createServer(app)
apolloServer.start().then(() => {
	apolloServer.applyMiddleware({ app, path: '/graphql' })
	server.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`)
	})
})
