import express from 'express'
import { globalError } from './middlewares/global-error.js'
import router from './routes/index.js'

const app = express()

app.use(express.json())

app.use(router)

app.use(globalError)

export default app