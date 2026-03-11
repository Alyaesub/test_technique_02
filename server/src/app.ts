import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { healthRouter } from './routes/health.route'
import housingUnitRoutes from './routes/housingUnit.routes'
import { notFound } from './middlewares/notFounds'
import { errorHandler } from './middlewares/errorHandler'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
)

app.use(express.json())

//route teste
app.use('/health', healthRouter)

//route 
app.use('/housing-units', housingUnitRoutes)

app.use(notFound)
app.use(errorHandler)

export default app