import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { healthRouter } from './routes/health.route'
import { notFound } from './middlewares/notFounds'
import { errorHandler } from './middlewares/errorHandler'
import housingUnitRoutes from './routes/housingUnit.routes'
import occupantRoutes from './routes/occupant.routes'

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

//routes principale de l'App
app.use('/housing-units', housingUnitRoutes)
app.use('/occupants', occupantRoutes)

//route des gestions des erreurs
app.use(notFound)
app.use(errorHandler)

export default app