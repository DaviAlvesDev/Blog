import app from "./app.js"
import { migrate } from "./db/index.js"
import 'dotenv/config'

async function startServer() {
    try {
        console.log('Syncing database...')
        await migrate()

        const PORT = process.env.PORT
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
    } catch (error) {
        console.error('Error:', error)
    }
}

startServer()