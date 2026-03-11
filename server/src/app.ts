import express from 'express'
import { rateLimit } from 'express-rate-limit'
import cors from 'cors'
import dotenv from 'dotenv'

//import des routes des erreur 
import { healthRouter } from './routes/health.route'
import { notFound } from './middlewares/notFounds'
import { errorHandler } from './middlewares/errorHandler'

//import des routes de l'App
import housingUnitRoutes from './routes/housingUnit.routes'
import occupantRoutes from './routes/occupant.routes'
import assignmentRoutes from './routes/assignment.routes'

dotenv.config()
const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 10, 
    standardHeaders: false,
    legacyHeaders: false, 
})

app.use(limiter)

//config routes cors et express
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
app.use('/assignments', assignmentRoutes)

//route des gestions des erreurs
app.use(notFound)
app.use(errorHandler)

export default app